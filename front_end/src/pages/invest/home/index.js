// import { useState } from "react";
import { useCurrentAccount } from '@mysten/dapp-kit';
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineSearch } from 'react-icons/ai';
import './styles.css';
import { formatDate, getPeriod } from '../../../util';
// import image from '../../../images/community.jpg';
import image from '../../../images/banner.jpg';
import { useEffect, useState } from 'react';
import InvestHomeLoading from './loading';
import { useNavigate } from 'react-router-dom';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { SuiClient } from '@mysten/sui/client';
import { bcs } from '@mysten/sui/bcs';
import { useTransactions } from '../../../hooks/useTx.ts';

const InvestHome = () => {

	const account = useCurrentAccount();
    // console.log(account.address)
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [lists, setLists] = useState([]);
    const navigate = useNavigate();

    // const lists = Array(5).fill({
    //     name: 'Ijaiye coin', max_supply: '250,000,000', object_id: '0k3f2c...8df306',
    //     date_created: String(new Date()), img: image,
    //     desc: 'USDT (Tether) is a stablecoin pegged to the U.S. Dollar, designed to maintain a 1:1 value ratio with USD. It offers the benefits of cryptocurrency while avoiding volatility, making it popular for trading and as a store of value.'
    // });

    const rpcurl = getFullnodeUrl("testnet");
    const client = new SuiClient({ url: rpcurl });

    const tx = useTransactions();

    const view_obj = {
        id: '0x30316bf6e62bb29ebdd37df37f5e22bc088d9fc9e4a0904f0fcfd25e44ab2e0a',
        module_name: 'community',
        method_name: 'view_community_list',
        packageId: '0x97543c57669cb51950dbf892700fb91fa93ce8b1592a1e3b69eb0ce525bfc623',
        data: 1
    }
    // {"avialable_index":"1","id":{"id":"0x30316bf6e62bb29ebdd37df37f5e22bc088d9fc9e4a0904f0fcfd25e44ab2e0a"}}
    async function handleFetchCommunity() {
        try {
            const result = await client.devInspectTransactionBlock({
                transactionBlock: tx.getCommunity(view_obj),
                sender: account.address,
            });
            const returnValues = result.results ? result.results.map(resultt => resultt.returnValues) : [];
            console.log(result, returnValues)
            
            console.log('Single...')
            const view_obj_ = {
                id: '0x30316bf6e62bb29ebdd37df37f5e22bc088d9fc9e4a0904f0fcfd25e44ab2e0a',
                module_name: 'community',
                method_name: 'view_community_list',
                packageId: '0x97543c57669cb51950dbf892700fb91fa93ce8b1592a1e3b69eb0ce525bfc623',
                data: 0
            }
            const result_ = await client.devInspectTransactionBlock({
                transactionBlock: tx.getViewCommunity(view_obj_),
                sender: account.address,
            });
            const returnValues_ = result_.results ? result.results.map(result__ => result__.returnValues) : [];
            console.log(result_, returnValues_)

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
        handleFetchCommunity();
    }, []);

    return (
        <div className="InvestHome">
            {
                loading ?

                <InvestHomeLoading /> :

                <div className='ih'>
                <div className='ih-sticky'>
                    <div className='ih-nav'>
                        <IoIosArrowBack className='ihn-icon pointer' />
                        <h3>Tokens</h3>
                    </div>
                    <div className='ih-search'>
                        <div className='ihs'>
                            <AiOutlineSearch className='ihs-icon' />
                            <input placeholder='Search for token name of Id' />
                        </div>
                    </div>
                </div>
                <div className='ih-main'>
                    <ul className='ihm-ul'>
                        {lists.map((val, idx) => (
                            <li key={`ihm-${idx}`} className='ihm-li pointer' onClick={() => navigate(`/app/invest/${idx}`)}>
                                <div className='ihml-header'>
                                    <img src={val.img} alt={'token-pic'} />
                                    <div className='ihml-name'>{val.name}</div>
                                    <span className='ihml-date'>{getPeriod(val.date_created)}</span>
                                </div>
                                <div className='ihml-details'>
                                    <div className='ihml-desc'>
                                        <span className='ihmld-name'>Max Supply</span>
                                        <span className='ihmld-value'>{val.max_supply}</span>
                                    </div>
                                    <div className='ihml-desc'>
                                        <span className='ihmld-name'>Object ID</span>
                                        <span className='ihmld-value'>{val.object_id}</span>
                                    </div>
                                    <div className='ihml-desc'>
                                        <span className='ihmld-name'>Date created</span>
                                        <span className='ihmld-value'>{formatDate(val.date_created)}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>}
        </div>
    );
}

export default InvestHome;