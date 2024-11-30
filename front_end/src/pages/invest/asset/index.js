// import { useState } from "react";
import { useCurrentAccount } from '@mysten/dapp-kit';
import './styles.css';
import { IoIosArrowBack } from 'react-icons/io';
import { MdOutlineFileDownload } from "react-icons/md";
import LaunchPool from '../modal/launchpool';
import { useState } from 'react';
import AssetLoading from './loading';

const Asset = () => {

	const account = useCurrentAccount();
    // console.log(account.address)

    const assetDocuments = Array(5).fill(0);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <div className="Asset">
            {
                loading ?

                <AssetLoading /> :

                <div className='asset'>
                <div className='asset-header'>
                    <IoIosArrowBack className='ah-icon pointer' />
                    <h3>Ijaiye asset</h3>
                </div>
                <div className='asset-main'>
                    <ul className='am-ul'>
                        {assetDocuments.map((val, idx) => (
                            <li className='am-li' key={`am-li-${idx}`} onClick={()=>setModal(true)}>
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
                                        <span className='amldf-name'>Proof of ownership.pdf</span>
                                        <span className='amldf-size'>22MB</span>
                                    </div>
                                    <div className='amldf-right'>
                                        <MdOutlineFileDownload className='amldfr-icon pointer' />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>}

            {modal && <LaunchPool closeModal={() => setModal(false)} />}
        </div>
    );
}

export default Asset;