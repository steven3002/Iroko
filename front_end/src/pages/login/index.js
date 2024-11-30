// import { useState } from "react";
import { useCurrentAccount } from '@mysten/dapp-kit';
import './styles.css';
import WalletButton from '../../component/button';

const Login = () => {

	const account = useCurrentAccount();
    // console.log(account.address)

    return (
        <div className="login">
            <div className='li'>
                <h1>Connect your wallet</h1>
                <div className="su-form-connect">
                    <WalletButton />
                </div>
            </div>
        </div>
    );
}

export default Login;