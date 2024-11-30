import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import '../asset/styles.css';
import './styles.css';
import { useTransactions } from "../../../hooks/useTx.ts";
import { useExecutor } from "../../../hooks/useExecutor";
import { useCurrentAccount } from "@mysten/dapp-kit";
import LoadingSpinner from "../../../component/loading/spinner.js";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import { SuiClient } from "@mysten/sui/client";
import { bcs } from "@mysten/sui/bcs";
import { packageId } from "../../../lib.js";

const LaunchPool = ({ closeModal }) => {

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [amt, setAmt] = useState(0);
    const modalRef = useRef();

    function clickFn(e) {
        if(!modalRef.current) return;
        if(modalRef.current && !modalRef.current.contains(e.target)) { 
            // setOpen(false); 
            closeModal(); 
        }
    };

	const account = useCurrentAccount();

    const { _executor: signAndExecute } = useExecutor();

    const tx = useTransactions();

	const rpcurl = getFullnodeUrl("testnet");
    const client = new SuiClient({ url: rpcurl });

    const view_obj = {
        // 
    }

    async function handleFetchPool() {
        try {
            const result = await client.devInspectTransactionBlock({
                transactionBlock: tx.getLaunchPool(view_obj),
                sender: account.address,
            });
            const returnValues = result.results ? result.results.map(result => result.returnValues) : [];
            console.log(returnValues)
            for(let v of returnValues) {
                const xx = bcs.string().parse(Uint8Array.from(v[0][0]))
                console.log('xx', xx);
            }
            setData({})
            // setLoading(false);
        } catch (err) {
            console.log('err_1', err);
        }
    }

    useEffect(() => {
        // handleFetchPool()
        document.addEventListener("click", clickFn, true);

        return () => document.removeEventListener("click", clickFn, true);
        
    }, []);
    

    const post_obj = {
        id: '0x574622e11d1899319eff58bc64a0663f90115bc41af0e3c5f28612d2bd11f12c',
        module_name: 'idonk',
        method_name: 'pool_invest',
        data: amt
    }

    const sendTokens = async () => {
        // edit is just to post new data
        try {

            signAndExecute({ tx: tx.sendSui(post_obj) }, (res) => {
                console.log('transactions success', res);
                // set
            })
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <div className={`launchpool`}>
            <div className="lp" ref={modalRef}>
                {
                    loading ?

                    <div className="lp-loading">
                        <LoadingSpinner width={'40px'} height={'40px'} />
                    </div> :

                    <div>
                        <div className="lp-top">
                            <span className="lpt-txt">LaunchPool</span>
                            <AiOutlineClose className="lpt-icon pointer" onClick={() => closeModal()} />
                        </div>
                        {!success && <div className="lp-mid">
                            <h4>Earn new tokens</h4>
                            <div className="lpm">
                                <div>
                                    <span className="lpm-name">Total price pool</span>
                                    <span className="lpm-value">1,000,000</span>
                                </div>
                                <div>
                                    <span className="lpm-name">Total participants</span>
                                    <span className="lpm-value">200,000</span>
                                </div>
                                <div>
                                    <span className="lpm-name">Total projects</span>
                                    <span className="lpm-value">10</span>
                                </div>
                            </div>
                            <div className='am-li'>
                                <span className='aml-header'>PROOF OF OWNERSHIP</span>
                                <div className='aml-desc'>
                                    <div className='amld'>
                                        <span className='amld-name'>Issuer</span>
                                        <span className='amld-value'>Ijaiye community</span>
                                    </div>
                                    <div className='amld'>
                                        <span className='amld-name'>Location</span>
                                        <span className='amld-value'>Ijaiye LGA, Lagos</span>
                                    </div>
                                    <div className='amld'>
                                        <span className='amld-name'>Recepient</span>
                                        <span className='amld-value'>John Doe</span>
                                    </div>
                                    <div className='amld'>
                                        <span className='amld-name'>Recepient ID</span>
                                        <span className='amld-value'>17844BD</span>
                                    </div>
                                </div>
                                <div className='amld-footer'>
                                    <div className='amldf-left'>
                                        <input placeholder="Enter an amount" type="number" onChange={(e) => {
                                            setAmt(e.target.value);
                                        }} />
                                    </div>
                                    <div className='amldf-right' onClick={()=>sendTokens()}>
                                        <MdSend className='amldfr-icon pointer' />
                                    </div>
                                </div>
                            </div>
                        </div>}

                        {success && <div className="lp-success">
                            <div className="lps">
                                <IoMdCheckmarkCircleOutline className="lps-icon" />
                                <h3>Payent Successful</h3>
                                <span>You have Successfully invested in the token “Ijaiye Coin”  with amount $500.90</span>
                            </div>
                        </div>}
                    </div>
                }
            </div>
        </div>
    );
};

export default LaunchPool;