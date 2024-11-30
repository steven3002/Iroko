import SkeletonLoader from '../../../component/loading/skeleton';
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineSearch } from 'react-icons/ai';
import './styles.css';

const InvestHomeLoading = () => {

    const lists = Array(7).fill(0);

    return (
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
                            <li key={`ihm-${idx}`} className='ihm-li pointer'>
                                <div className='ihml-header'>
                                    <div className='ihml-image loading'><SkeletonLoader /></div>
                                    <div className='ihml-name loading'><SkeletonLoader /></div>
                                    <div className='ihml-date loading'><SkeletonLoader /></div>
                                </div>
                                <div className='ihml-details loading'>
                                    <div className='ihml-desc'>
                                        <div className='ihmld-name loading'><SkeletonLoader /></div>
                                        <div className='ihmld-value loading'><SkeletonLoader /></div>
                                    </div>
                                    <div className='ihml-desc'>
                                        <div className='ihmld-name loading'><SkeletonLoader /></div>
                                        <div className='ihmld-value loading'><SkeletonLoader /></div>
                                    </div>
                                    <div className='ihml-desc'>
                                        <div className='ihmld-name loading'><SkeletonLoader /></div>
                                        <div className='ihmld-value loading'><SkeletonLoader /></div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
    );
}

export default InvestHomeLoading;