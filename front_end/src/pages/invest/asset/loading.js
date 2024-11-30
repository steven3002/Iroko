import './styles.css';
import { IoIosArrowBack } from 'react-icons/io';
import { MdOutlineFileDownload } from "react-icons/md";
import SkeletonLoader from '../../../component/loading/skeleton';

const AssetLoading = () => {

    const arrs = Array(7).fill(0)

    return (
        <div className='asset'>
                <div className='asset-header'>
                    <IoIosArrowBack className='ah-icon pointer' />
                    <h3>Ijaiye asset</h3>
                </div>
                <div className='asset-main'>
                    <ul className='am-ul'>
                        {arrs.map((val, idx) => (
                            <li className='am-li' key={`am-li-${idx}`} style={{paddingTop: '8px'}}>
                                <div className='aml-header loading'><SkeletonLoader /></div>
                                <div className='aml-desc'>
                                    <div className='amld'>
                                        <div className='amld-name loading'><SkeletonLoader /></div>
                                        <div className='amld-value loading'><SkeletonLoader /></div>
                                    </div>
                                    <div className='amld'>
                                        <div className='amld-name loading'><SkeletonLoader /></div>
                                        <div className='amld-value loading'><SkeletonLoader /></div>
                                    </div>
                                    <div className='amld'>
                                        <div className='amld-name loading'><SkeletonLoader /></div>
                                        <div className='amld-value loading'><SkeletonLoader /></div>
                                    </div>
                                    <div className='amld'>
                                        <div className='amld-name loading'><SkeletonLoader /></div>
                                        <div className='amld-value loading'><SkeletonLoader /></div>
                                    </div>
                                </div>
                                <div className='amld-footer loading'>
                                    <div className='amldf-left'>
                                        <div className='amldf-name loading'><SkeletonLoader /></div>
                                        <div className='amldf-size loading'><SkeletonLoader /></div>
                                    </div>
                                    <div className='amldf-right'>
                                        <div className='amldfr-icon loading'><SkeletonLoader /></div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
    );
}

export default AssetLoading;