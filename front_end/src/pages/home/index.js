// import { useState } from "react";
import { useCurrentAccount } from '@mysten/dapp-kit';
import './styles.css';
import WalletButton from '../../component/button';
import Layout from '../../component/layout';

const Home = () => {

	const account = useCurrentAccount();
    // console.log(account.address)

    return (
        <Layout>
            <div className="Home">
                <div className='hm'>
                    <h1>Home</h1>
                </div>
            </div>
        </Layout>
    );
}

export default Home;