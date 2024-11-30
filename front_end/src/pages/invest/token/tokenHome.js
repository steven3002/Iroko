// import { useState } from "react";
import { useCurrentAccount } from '@mysten/dapp-kit';
import image from '../../../images/banner.jpg';
import '../home/styles.css';
import './styles.css';
import { useMemo, useState } from 'react';
import { formatDate, getPeriod } from '../../../util';
import { IoIosArrowBack } from 'react-icons/io';
import TokenHomeLoading from './loading';
import { useNavigate, useParams } from 'react-router-dom';

const TokenHome = () => {

    const [routes, setRoutes] = useState('about');
    const [loading, setLoading] = useState(false);
	const account = useCurrentAccount();
    const { token_id } = useParams();
    const navigate = useNavigate();
    const token = {
        date: String(new Date()),
        name: 'Ijaiye'
    }
    // console.log(account.address)

    const lists = Array(5).fill({
        name: 'Ijaiye coin', max_supply: '250,000,000', object_id: '0k3f2c...8df306',
        date_created: String(new Date()), img: image,
        desc: 'USDT (Tether) is a stablecoin pegged to the U.S. Dollar, designed to maintain a 1:1 value ratio with USD. It offers the benefits of cryptocurrency while avoiding volatility, making it popular for trading and as a store of value.'
    });

    const getDate = useMemo(() => {
        return String(token.date).slice(0, 15);
    }, []);

    return (
        <div className="TokenHome">
            {
                loading ?

                <TokenHomeLoading /> :
                
                <div className='tokenHome'>

                <div className='tkh-routes'>
                    <div className={`tkhr pointer ${routes==='about'}`} onClick={()=>setRoutes('about')}>About</div>
                    <div className={`tkhr pointer ${routes==='assets'}`} onClick={()=>setRoutes('assets')}>Assets</div>
                </div>

                <div className={`tkh ${routes==='about'}`}>
                    <div className='tkh_'>
                        <IoIosArrowBack className='tkh-icon pointer' />
                        <h3>Ijaiye token</h3>
                    </div>
                    <div className='tkh-header'>
                        <div className='tkh-image'></div>
                        <div className='tkhh-txt'>
                            <span className='tkhh-token'>Token</span>
                            <span className='tkhh-token-name'>{token.name}</span>
                        </div>
                    </div>
                    <div className='tk-desc'>
                        <div className='tkd'>
                            <span className='tkd-name'>Social links</span>
                            <div className='tkd-value'>
                                <a>www.x.com/ijaiye_coin</a>
                                <a>www.instagram.com/ijaiye_coin</a>
                            </div>
                        </div>
                        <div className='tkd'>
                            <span className='tkd-name'>Date created</span>
                            <div className='tkd-value'>
                                <span>{getDate}</span>
                            </div>
                        </div>
                        <div className='tkd'>
                            <span className='tkd-name'>Maximum supply</span>
                            <div className='tkd-value'>
                                <span>250,000,000<span className='tk-symbol'>IJY</span></span>
                            </div>
                        </div>
                        <div className='tkd'>
                            <span className='tkd-name'>Base valuation</span>
                            <div className='tkd-value'>
                                <span>1,000,000</span>
                            </div>
                        </div>
                        <div className='tkd'>
                            <span className='tkd-name'>Decimal</span>
                            <div className='tkd-value'>
                                <span>6</span>
                            </div>
                        </div>
                        <div className='tkd'>
                            <span className='tkd-name'>Main produce(s)</span>
                            <div className='tkd-value'>
                                <span>Milk,wood,poultry and wood</span>
                            </div>
                        </div>
                        <div className='tkd'>
                            <span className='tkd-name'>Location</span>
                            <div className='tkd-value'>
                                <span>Ijaiye LGA, Lagos</span>
                            </div>
                        </div>
                    </div>
                    <div className='tk-description'>
                        <span className='tkdesc'>Description</span>
                        <span className='tkdesc-txt'>
                            USDT (Tether) is a stablecoin pegged to the U.S. Dollar, designed to maintain a 1:1 
                            value ratio with USD. It offers the benefits of 
                            cryptocurrency while avoiding volatility, making it popular for trading and as a store of value.
                        </span>
                    </div>
                </div>

                <div className={`tk-assets ${routes==='assets'}`}>
                    <div className='tka'>
                        <h3>Assets</h3>

                        <ul className='ihm-ul'>
                            {lists.map((val, idx) => (
                                <li key={`ihm-${idx}`} className='ihm-li pointer' onClick={() => navigate(`/app/invest/${token_id}/${idx}`)}>
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
                </div>
            </div>}
        </div>
    );
}

export default TokenHome;