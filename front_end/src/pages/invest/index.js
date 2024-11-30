// import { useState } from "react";
import { useCurrentAccount } from '@mysten/dapp-kit';
import './styles.css';
import Layout from '../../component/layout';
import { Route, Routes } from 'react-router-dom';
import Token from './token';
import InvestHome from './home';

const Invest = () => {

	const account = useCurrentAccount();
    // console.log(account.address)

    return (
        <Layout>
            <div className="Invest">
                <Routes>
                    <Route path='/' element={<InvestHome />} />
                    <Route path='/:token_id/*' element={<Token />} />
                </Routes>
            </div>
        </Layout>
    );
}

export default Invest;