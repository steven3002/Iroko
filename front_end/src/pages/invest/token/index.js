// import { useState } from "react";
import { useCurrentAccount } from '@mysten/dapp-kit';
import './styles.css';
import { Route, Routes } from 'react-router-dom';
import TokenHome from './tokenHome';
import Asset from '../asset';

const Token = () => {

	const account = useCurrentAccount();
    // console.log(account.address)

    return (
        <div className="Token">
            <Routes>
                <Route path='/' element={<TokenHome />} />
                <Route path='/:asset_id' element={<Asset />} />
            </Routes>
        </div>
    );
}

export default Token;