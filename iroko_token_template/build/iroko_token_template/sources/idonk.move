

module iroko_token_template::idonk;

use std::string::{Self, String};
use sui::sui::SUI;
use sui::coin::{Self, TreasuryCap, Coin};
use sui::balance::{Self, Balance};
use sui::clock::Clock;
use sui::dynamic_object_field as ofield;

public struct IDONK has drop {}


public struct LunchPool has key, store{
    id: UID,
    total_pool: u64,
    claimed_unit: u64,
    cost: u64,
    invest_made: Balance<SUI>,
    start_at: u64,
    end_at: u64,
    participants: u64,
}

public struct Receipt has key{
    id: UID,
    created_at: u64,
    amount: u64,
}

public struct PlaceHolder has key, store{
    id: UID,
    user: address,
    balance: u64,
}

public struct IndexDummy has copy, store, drop{
    index: u64,
}

#[error]
const EInvalidParameter: vector<u8> = b"invalid path";


// const MAXSUPPLY = 200_000_000_000_000;

fun init(witness: IDONK, ctx: &mut TxContext) {
		let (treasury, metadata) = coin::create_currency(
				witness,
				6,
				b"IDONK",
				b"",
				b"",
				option::none(),
				ctx,
		);
		transfer::public_freeze_object(metadata);
		transfer::public_transfer(treasury, ctx.sender());
}



public fun mint(treasury_cap: &mut TreasuryCap<IDONK>,  amount: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    let coin = coin::mint(treasury_cap, amount, ctx);
    transfer::public_transfer(coin, recipient)
}


public fun create_pool(treasury_cap: &mut TreasuryCap<IDONK>,  
    amount: u64, 
    start: u64,
    ends: u64,
    cost: u64,
    ctx: &mut TxContext){
    let pool = LunchPool{
        id: object::new(ctx),
        total_pool: amount,
        claimed_unit:  0,
        cost: cost,
        invest_made: balance::zero<SUI>(),
        start_at: start,
        end_at: ends,
        participants: 0,
    };

    transfer::public_share_object(pool);
}




public fun pool_invest(pool: &mut LunchPool, coin: Coin<SUI>, clock : &Clock, ctx: &mut TxContext){
    let amount = coin.value();
    assert!(amount > 0, EInvalidParameter);
      let token_amount = amount / pool.cost;
      let claimed_unit = pool.claimed_unit;
    let check = token_amount + claimed_unit;
    assert!(pool.total_pool > check, EInvalidParameter);


    let coin_balance = coin.into_balance();
    

    let place_holder = PlaceHolder{
        id: object::new(ctx),
        user: ctx.sender(),
        balance: token_amount,
    };
    

    let receipt = Receipt{
        id: object::new(ctx),
        created_at : clock.timestamp_ms(),
        amount:token_amount
    };

    transfer::transfer(receipt, ctx.sender());
    invest(pool, place_holder);

    
    pool.claimed_unit = claimed_unit + token_amount;
    balance::join(&mut pool.invest_made, coin_balance);

}


public fun distribute_tokens(
    treasury_cap: &mut TreasuryCap<IDONK>,  
    pool: &mut LunchPool,
    ctx: &mut TxContext,){
        let last_index =  pool.participants;
        let mut i: u64 = 0;
        while(i < last_index){
            let place_holder = get_placeholder(pool, i);
            mint(treasury_cap, place_holder.balance, place_holder.user, ctx);
            i = i + 1;
        };
        withdraw(pool, ctx);
    
}



// ======= helper functions ======//
fun invest(pool: &mut LunchPool, balance: PlaceHolder){
    let index = pool.participants +1;
    pool.participants = index;
    ofield::add(&mut pool.id, index,  balance);
    
}

fun get_placeholder(pool: &LunchPool, index: u64): &PlaceHolder{
    ofield::borrow(&pool.id, index)
}

fun withdraw(pool: &mut LunchPool, ctx: &mut TxContext){
    let amount = balance::value(&pool.invest_made);
    let invest = coin::take(&mut pool.invest_made, amount, ctx);
    transfer::public_transfer(invest, ctx.sender()); 
}



#[test]
fun equip_accessory() {
    let ctx = &mut tx_context::dummy();
    // let dummy = b"0".to_string(); 
    let mut pool = LunchPool{
        id: object::new(ctx),
        total_pool: 10000,
        claimed_unit:  0,
        cost: 2,
        invest_made: balance::zero<SUI>(),
        start_at: 0,
        end_at: 0,
        participants: 0,
    };

    // Create an accessory and attach it to the character
    let hat = PlaceHolder{
        id: object::new(ctx),
        user: ctx.sender(),
        balance: 1000,
    };
    let data = &pool.participants;

    invest(&mut pool, hat);



    let dummy = IndexDummy{
        index: 0,
    };

    assert!(pool.participants == 1 , 1);
//  
    // However for non-key structs we can only use `dynamic_field`
    // ofield::add(&mut pool.id, 0, hat);

  
    let hat_ref: &PlaceHolder = get_placeholder(&mut pool, 0);
   
    assert!(hat_ref.balance == 1000, 1);
    let dummy_address = @0xCAFE;
    transfer::public_transfer(pool, dummy_address);
    //  transfer::public_transfer(hat, dummy_address);
}