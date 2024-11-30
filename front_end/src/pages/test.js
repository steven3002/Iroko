// import { useState } from "react";
import { useCurrentAccount } from '@mysten/dapp-kit';
import { bcs, fromHex, toHex } from "@mysten/bcs";
// import './styles.css';
import WalletButton from '../component/button';
// import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { useState } from 'react';
import { useExecutor } from '../hooks/useExecutor';
// import { useTransactions } from '../hooks/useTransactions';
import { useTransactions } from '../hooks/useTx.ts';
// import { useSuiClient } from '@mysten/dapp-kit';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';



const Test = () => {

    const [inp, setInp] = useState('');

	const account = useCurrentAccount();

    const { _executor: signAndExecute } = useExecutor();

    const tx = useTransactions();
	const rpcurl = getFullnodeUrl("testnet");
    const client = new SuiClient({ url: rpcurl });
	// const client = useSuiClient({ url: rpcurl });
    

    const view_obj = {
        id: '0x35c0d1d46512cc3c10fe278e55380de979a30407a96c4b44d48a17649b32d863',
        module_name: 'test_frontend',
        method_name: 'view_drug'
    }

    const post_obj = {
        id: '0x35c0d1d46512cc3c10fe278e55380de979a30407a96c4b44d48a17649b32d863',
        module_name: 'test_frontend',
        method_name: 'edit_injection',
        data: inp
    }

    // const election_name = bcs.string().parse(Uint8Array.from(returnValues[0][0][0]));
    // const election_description = bcs.string().parse(Uint8Array.from(returnValues[0][1][0]));
    // const num_candidates = bcs.u64().parse(Uint8Array.from(returnValues[0][2][0]));
    // const num_voters = bcs.u64().parse(Uint8Array.from(returnValues[0][3][0]));
    // const num_votes = bcs.u64().parse(Uint8Array.from(returnValues[0][4][0]));
    // const start_time = bcs.u64().parse(Uint8Array.from(returnValues[0][5][0]));
    // const end_time = bcs.u64().parse(Uint8Array.from(returnValues[0][6][0]));
    // const election_status = bcs.bool().parse(Uint8Array.from(returnValues[0][7][0]));
    // const taken_place = bcs.bool().parse(Uint8Array.from(returnValues[0][8][0]));

    async function handleQuery() {
        try {
            // const result = await client.devInspectTransactionBlock({
            //     transactionBlock: tx.getTx(view_obj),
            //     sender: account.address,
            // });
            // const returnValues = result.results ? result.results.map(result => result.returnValues) : [];
            // for(let v of returnValues) {
            //     const xx = bcs.string().parse(Uint8Array.from(v[0][0]))
            //     console.log('xx', xx);
            // }
            const object = await client.getObject({ id: view_obj.id });
              
            if (object.status === 'Exists') {
            console.log('Object Data:', object.data);
            return object.data;
            } else {
            console.error('Object not found or does not exist.');
            }
        } catch (err) {
            console.log('err_1', err);
        }
    }
    async function handlePost() {
        // edit is just to post new data
        try {

            signAndExecute({ tx: tx.sendTx(post_obj) }, (res) => {
                console.log('transactions success', res);
                // set
            })
        } catch(err) {
            console.log(err)
        }
    }
    function handleInput(e) {
        setInp(e.target.value);
    }

    return (
        <div className="test">
            <div className='li'>
                <h1>Connect your wallet</h1>
                <div className="su-form-connect">
                    <WalletButton />
                </div>
            </div>
            <button onClick={handleQuery}>Query</button>
            <input onChange={handleInput} />
            <button onClick={handlePost}>Send</button>
        </div>
    );
}

export default Test;