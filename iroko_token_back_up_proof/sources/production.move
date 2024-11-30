module production::community;

// use sui::object::ta
use sui::{event};
use sui::dynamic_object_field as ofield;
use std::string::{Self, String};
use sui::transfer;
use sui::clock::Clock;





// to make sure that the init function is called only once m,;'\]
public struct COMMUNITY has drop{}

// this is to make sure that only the user of this pass can modify 
// a given set of data 
#[allow(unused_field)]
public struct Admin has key{
    id: UID,
    value: u8,
}

#[allow(unused_field)]
//this is the application object
public struct Iroko has key, store{
    id: UID,
    avialable_index: u64,
}

#[allow(unused_field)]
public struct Community has key, store{
    id: UID,
    // proof: ,
    authour: address,
    logo: String,
    name: String,
    description: String,
    location: String,
    // growth_potential: 
    date_created: u64,
    stage: String,
    // the id of the token created
    token_id: address,
    // will use balance later, but due to rush we might have to use this 
    base_valuation: u64,
    maximum_supply: u64,
    avialable_index: u64,
    
}
#[allow(unused_field)]
public struct Backing has key, store{
    id: UID,
    name: String,
    main_produce: String,
    wallet_address: address,
    location: String,
    avialable_index: u64,


}
#[allow(unused_field)]
public struct Proof has key, store{
    id: UID,
    name: String,
    description: String,
    url: String,

}


#[allow(unused_field)]
public struct CommunityView has store, copy, drop{
    community_id : u64,
    logo: String,
    name: String,
    token_id: address,
    maximum_supply: u64,
    date_created: u64,
}


//========== events ========//
// event for creation of community
#[allow(unused_field)]
public struct CommunityCreated has copy, drop {
    community: ID,
    name: String,
    // created_at: u64,
}


// event for creation of backing
#[allow(unused_field)]
public struct BackingAdded has copy, drop {
    backing_id: ID,
    name: String,

}

//  event for creation of proof
public struct ProofAdded has copy, drop{
    proof_id: ID,
    name: String,
}

//event for edition of base valuation
public struct BaseEdit has copy, drop{
    community_id: ID,
    previous_valuation: u64,
    valuation: u64, 
}

//event to inform that a community information has been updated
public struct CommunityInfoUpdated has copy, drop{
    community_id: ID,
    key: String,
    old_value: String,
    new_value: String,
}

//event to inform that a backing has been updated
public struct BackingInfoUpdate has copy, drop{
    backing_id: ID,
    key: String,
    old_value: String,
    new_value: String,
}

//======= error =========//
#[error]
const EInvalidAdminKey: vector<u8> = b"Not origin";


#[error]
const EInvalidParameter: vector<u8> = b"invalid path";




fun init(_: COMMUNITY, ctx: &mut TxContext) {

    let admin_key = Admin{
        id: object::new(ctx),
        value: 1,
    };

    let app = Iroko{
        id: object::new(ctx),
        avialable_index: 0,
    };

// make the object public
   transfer::public_share_object(app);

// send the admin key to the creator
    transfer::transfer(admin_key, tx_context::sender(ctx));
}


public fun demo(admin : &Admin, iroko :&mut Iroko, clock :&Clock, token: address, ctx: &mut TxContext){
    create_community(admin, 
    iroko,
    clock,
    b"placeholder".to_string(),
    b"idonk".to_string(),
    b"introduction".to_string(),
    b"".to_string(),
    token,
    1000000000000,
    ctx);

    create_backing(
        admin,
        iroko,
        b"".to_string(),
        b"".to_string(),
        token,
        b"".to_string(),
        0,
        ctx
    );

    create_proof(
            admin,
            iroko,
            b"".to_string(),
            b"".to_string(),
            b"".to_string(),
            0,
            0,
            ctx
        );

    
}


// this is to creat admin access, but with a depreciated  value, so that only the first admin can create new admin object,
public fun mint_admin(admin: &Admin, new_admin: address, ctx: &mut TxContext){
    // check if the admin is valid (i.e to check if the admin is the original)
    assert!(admin.value == 1, EInvalidAdminKey);

    let minting = Admin{
        id: object::new(ctx),
        value: 0,
    };

    transfer::transfer(minting, new_admin);
}


// public fun deny_admin(){}


// creates community object and pins it to the iroko application
public fun create_community(_: &Admin, 
    iroko: &mut Iroko,
    clock: &Clock,
    logo: String,
    name: String,
    description: String,
    location: String,
    token_id: address,
    maximum_supply: u64,
    ctx: &mut TxContext)
    {
    
        let community_ = Community{
            id: object::new(ctx),
            authour: ctx.sender(),
            logo: logo,
            name: name,
            description: description,
            location: location,
            date_created:  clock.timestamp_ms(),
            stage: b"new".to_string(),
            token_id: token_id,
            base_valuation: 0,
            maximum_supply: maximum_supply,
            avialable_index: 0,
        };

      

        event::emit(CommunityCreated{
            community: object::id(&community_),
            name: name,
            // created_at:  timestamp_ms(),
        });

          add_to_iroko(iroko, community_);


}


// create backing object and pin it to a particular community{Token}
public fun create_backing(_: &Admin, 
    iroko: &mut Iroko,
    name: String,
    main_produce: String,
    wallet_address: address,
    location: String,
    community_index: u64,
    ctx: &mut TxContext
    ){
        let new_backing =Backing{
            id: object::new(ctx),
            name: name,
            main_produce: main_produce,
            wallet_address: wallet_address,
            location: location,
            avialable_index: 0,
        };


        event::emit(BackingAdded{
                backing_id: object::id(&new_backing),
                name: name,
                // created_at:  timestamp_ms(),
            });
        let community = get_mut_community(iroko, community_index);
        add_to_community(community, new_backing);


}


// create proof and pin it to a particular backing in a community(Token)
public fun create_proof(_: &Admin,
    iroko: &mut Iroko,
    name: String,
    description: String,
    url: String,
    community_index: u64,
    backing_index: u64,
    ctx: &mut TxContext 
    ){

        let proof = Proof{
            id: object::new(ctx),
            name: name,
            description: description,
            url: url,
        };

        event::emit(ProofAdded{
            proof_id: object::id(&proof),
            name: name
        });
    let community = get_mut_community(iroko, community_index);
    let backing = get_mut_backing(community, backing_index);
    add_to_backing(backing, proof);


}


// ======== modification applification   =======//

// this function is to update the base valuation of a particular community 

public fun update_base(_: &Admin,  
    iroko: &mut Iroko,
    community_index: u64, 
    valuation: u64 
    ){
    let community = get_mut_community(iroko, community_index);
    let previous_valuation = community.base_valuation;
    community.base_valuation = valuation;

    event::emit(BaseEdit{
        community_id: object::id(community),
        previous_valuation: previous_valuation,
        valuation :valuation,
    });
}


public fun modify_backing_metadata(_: &Admin,  
    iroko: &mut Iroko,
    community_index: u64,
    backing_index: u64,
    key_field: String,
    value_field: String,
    ){
        let community = get_mut_community(iroko, community_index);
        let backing = get_mut_backing(community, backing_index);
        let mut old_value = b"".to_string();
        if (key_field == b"name".to_string()){
            old_value = backing.name;
            backing.name = value_field;
        }else if (key_field == b"main_produce".to_string()){
            old_value = backing.main_produce;
            backing.main_produce = value_field;
        }else{
            abort EInvalidParameter
        };
        event::emit(BackingInfoUpdate{
            backing_id: object::id(backing),
            key: key_field,
            old_value: old_value,
            new_value: value_field,
        })

}

public fun modify_community_metadat(_: &Admin, 
    iroko: &mut Iroko, 
    community_index: u64, 
    key_field: String, 
    new_value: String){
    let community = get_mut_community(iroko, community_index);
    let mut  old_value = b"".to_string();
    if (key_field == b"name".to_string()){
  
        old_value = community.name;
        community.name = new_value;
    }else if (key_field == b"description".to_string()){
        
        old_value = community.description;
        community.description = new_value;
    }else if (key_field == b"stage".to_string()){
        
        old_value = community.stage;
        community.stage = new_value;
    }else{
        abort EInvalidParameter
    };
    event::emit(CommunityInfoUpdated{
        community_id: object::id(community),
        key: key_field,
        old_value: old_value,
        new_value: new_value,
    })
        
}


// ============ view functions  ===========//

public fun view_community_list(iroko : &mut Iroko, community_set : u64): vector<CommunityView>{
    // community set is just a simple way we will handle retriving of data 
    // if community_set = 1, then communities 0 to 9 will be sent 
    // if community_set = 2, then communities 10 to 19 will be sent
    assert(community_set > 0, EInvalidParameter);
    let bound = 10;
    let upper_bound = bound * community_set;
    let lower_bound = upper_bound - 10;
    let mut i: u64 = lower_bound;
    let mut set = vector::empty<CommunityView>();
    while (i < (upper_bound)) {
        let community = get_community(iroko, i);
        let unit_community = CommunityView{
            community_id: i,
            logo: community.logo,
            name: community.name,
            token_id: community.token_id,
            maximum_supply: community.maximum_supply,
            date_created: community.date_created
        };
        vector::push_back(&mut set, unit_community);
        i = i + 1;
    };
    set
    
}


public fun view_community(iroko : &mut Iroko, community_id: u64): &Community{
    let community = get_mut_community(iroko, community_id);
    community
}

public fun view_backing(iroko: &mut Iroko, community_id: u64, backing_id: u64): &Backing{
    let community = get_mut_community(iroko, community_id);
    let backing = get_mut_backing(community, backing_id);
    backing
}

public fun view_proof(iroko: &mut Iroko, community_id: u64, backing_id: u64, proof_id: u64): &Proof{
    let community =  get_mut_community(iroko, community_id);
    let backing = get_mut_backing(community, backing_id);
    let proof = get_mut_proof(backing, proof_id);
    proof
}






//=======   Helper functions ========//
fun add_to_iroko(iroko: &mut Iroko, community: Community) {
    let index = iroko.avialable_index;
    ofield::add(&mut iroko.id, index, community);
    iroko.avialable_index = index + 1;
}

fun add_to_community(community: &mut Community, backing: Backing) {
    let index = community.avialable_index;
    ofield::add(&mut community.id, index, backing);
    community.avialable_index = index + 1;
}

fun add_to_backing(backing: &mut Backing, proof: Proof) {
    let index = backing.avialable_index;
    ofield::add(&mut backing.id, index, proof);
    backing.avialable_index = index + 1;
}

fun get_mut_community(iroko: &mut Iroko, index: u64): &mut Community{
    ofield::borrow_mut(&mut iroko.id, index)
}

fun get_mut_backing(community: &mut Community, index: u64): &mut Backing{
    ofield::borrow_mut(&mut community.id, index)
}

fun get_mut_proof(backing: &mut Backing, index: u64): &mut Proof{
    ofield::borrow_mut(&mut backing.id, index)
}

fun get_community(iroko: &Iroko, index: u64): &Community{
    ofield::borrow(&iroko.id, index)
}

fun get_backing(community: &Community, index: u64): &Backing{
    ofield::borrow(&community.id, index)
}

fun get_proof(backing: &Backing, index: u64): &Proof{
    ofield::borrow(&backing.id, index)
}












