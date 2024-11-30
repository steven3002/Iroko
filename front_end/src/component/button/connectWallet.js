import { ConnectButton } from '@mysten/dapp-kit';
import './styles.css';

const ConnectWallet = () => {

    return (
        <div className='connect-wallet-btn'>
            <div className='cwb'>
                <h3>Connect wallet to continue</h3>
                <p>No wallet connected. Connect your wallet to continue.</p>
                <ConnectButton />
            </div>
        </div>
    )
}

export default ConnectWallet;