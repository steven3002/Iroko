// import { useState } from "react";
import '../home/styles.css';
import './styles.css';
import { IoIosArrowBack } from 'react-icons/io';
import SkeletonLoader from '../../../component/loading/skeleton';

const TokenHomeLoading = () => {

    const lists = Array(6).fill(0);

    return (
        <div className='tokenHome'>

                <div className={`tkh true`}>
                    <div className='tkh_'>
                        <IoIosArrowBack className='tkh-icon pointer' />
                        <h3 className='loading'><SkeletonLoader /></h3>
                    </div>
                    <div className='tkh-header'>
                        <div className='tkh-image loading'><SkeletonLoader /></div>
                        <div className='tkhh-txt'>
                            <div className='tkhh-token loading'><SkeletonLoader /></div>
                            <div className='tkhh-token-name loading'><SkeletonLoader /></div>
                        </div>
                    </div>
                    <div className='tk-desc'>
                        <div className='tkd'>
                            <div className='tkd-name loading'><SkeletonLoader /></div>
                            <div className='tkd-value loading'><SkeletonLoader /></div>
                        </div>
                        <div className='tkd'>
                            <div className='tkd-name loading'><SkeletonLoader /></div>
                            <div className='tkd-value'>
                                <div className=' loading'><SkeletonLoader /></div>
                            </div>
                        </div>
                        <div className='tkd'>
                            <div className='tkd-name loading'><SkeletonLoader /></div>
                            <div className='tkd-value'>
                                <div className=' loading'><SkeletonLoader /></div>
                            </div>
                        </div>
                        <div className='tkd'>
                            <div className='tkd-name loading'><SkeletonLoader /></div>
                            <div className='tkd-value'>
                                <div className=' loading'><SkeletonLoader /></div>
                            </div>
                        </div>
                        <div className='tkd'>
                            <div className='tkd-name loading'><SkeletonLoader /></div>
                            <div className='tkd-value'>
                                <div className='loading'><SkeletonLoader /></div>
                            </div>
                        </div>
                        <div className='tkd'>
                            <div className='tkd-name loading'><SkeletonLoader /></div>
                            <div className='tkd-value'>
                                <div className='loading'><SkeletonLoader /></div>
                            </div>
                        </div>
                        <div className='tkd'>
                            <div className='tkd-name loading'><SkeletonLoader /></div>
                            <div className='tkd-value'>
                                <div className='loading'><SkeletonLoader /></div>
                            </div>
                        </div>
                    </div>
                    <div className='tk-description'>
                        <div className='tkdesc loading'><SkeletonLoader /></div>
                        <div className='tkdesc-txt loading'><SkeletonLoader /> </div>
                    </div>
                </div>

                <div className={`tk-assets false`}>
                    <div className='tka'>
                        <h3>Assets</h3>

                        <ul className='ihm-ul'>
                            {lists.map((val, idx) => (
                                <li key={`ihm-${idx}`} className='ihm-li pointer'>
                                    <div className='ihml-header'>
                                        <div className='ihml-name loading'><SkeletonLoader /></div>
                                        <div className='ihml-date loading'><SkeletonLoader /></div>
                                    </div>
                                    <div className='ihml-details loading'>
                                        <div className='ihml-desc'>
                                            <div className='ihmld-name loading_txt'><SkeletonLoader /></div>
                                            <div className='ihmld-value loading_txt'><SkeletonLoader /></div>
                                        </div>
                                        <div className='ihml-desc'>
                                            <div className='ihmld-name loading_txt'><SkeletonLoader /></div>
                                            <div className='ihmld-value loading_txt'><SkeletonLoader /></div>
                                        </div>
                                        <div className='ihml-desc'>
                                            <div className='ihmld-name loading_txt'><SkeletonLoader /></div>
                                            <div className='ihmld-value loading_txt'><SkeletonLoader /></div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
        </div>
    );
}

export default TokenHomeLoading;