import { useState } from 'react';
import './styles.css';
import NavRoutes from './v';
import { useNavigate } from 'react-router-dom';
import { useCurrentAccount } from '@mysten/dapp-kit';
import WalletButton from '../button';
import ConnectWallet from '../button/connectWallet';
// import WalletButton from '../button';

const Layout = ({ children }) => {

    const [index, setIndex] = useState(0);
    const [expand, setExpand] = useState(true);
    const navigate = useNavigate();
    const account = useCurrentAccount();

    function clickFn(val, idx) {
        setIndex(idx);
        // nav to val.link
        navigate(val.link)
    };

    return (
        <div className="Layout">
            <div className='__ly__'>
                <div className='side-navbar'>
                    <nav className={`ly_nav ${expand?'expand':''}`}>
                        <div className='lyn_header'>
                            <h3>IROKO</h3>
                        </div>
                        <div className='lyn_main'>
                            <ul>
                                {NavRoutes.map((val, idx) => (
                                    <li className={`lyn-li pointer ${idx===index}`} 
                                    onClick={() => clickFn(val, idx)} key={`nav-side-${idx}`}>
                                        <div className='lyn'>
                                            {val.icon(index === idx)}
                                            <span>{val.name}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='lyn_base'>
                            <div className='lyn_li'>
                                <WalletButton />
                            </div>
                        </div>
                    </nav>
                </div>

                <main>
                    {
                        !account?.address ?
                        <ConnectWallet /> :
                        children
                    }
                </main>

                <footer>
                    <div className='footer-nav'>  
                        <ul>
                            {NavRoutes.map((val, idx) => (
                                <li className={`fn-li pointer ${idx===index}`}  
                                onClick={() => clickFn(val, idx)} key={`nav-footer-${idx}`}>
                                    <div className='fn'>
                                        {val.icon(index === idx)}
                                        <span>{val.name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Layout;