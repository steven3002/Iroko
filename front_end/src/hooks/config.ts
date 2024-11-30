// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { createNetworkConfig } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';

import { packageId } from '../lib.js';

const MainnetPackage = {
	packageId: null,
	upgradeCap: null,
};
const LocalnetPackage = MainnetPackage;
const DevnetPackage = MainnetPackage
const TestnetPackage = {
	packageId, upgradeCap: '0x71a69d9d7319c0c86e0a5266746f85481840064e19fdb491ce83843851f5fe9d',
};


const { networkConfig, useNetworkVariable } = createNetworkConfig({
	localnet: {
		url: getFullnodeUrl('localnet'),
		variables: {
			explorer: (id: string) => `https://explorer.polymedia.app/object/${id}/?network=local`,
			...LocalnetPackage,
		},
	},
	devnet: {
		url: getFullnodeUrl('devnet'),
		variables: {
			explorer: (id: string) => `https://suiscan.xyz/devnet/object/${id}/`,
			...DevnetPackage,
		},
	},
	testnet: {
		url: getFullnodeUrl('testnet'),
		variables: {
			explorer: (id: string) => `https://suiscan.xyz/testnet/object/${id}/`,
			...TestnetPackage,
		},
	},
	mainnet: {
		url: getFullnodeUrl('mainnet'),
		variables: {
			explorer: (id: string) => `https://suiscan.xyz/mainnet/object/${id}/`,
			...MainnetPackage,
		},
	},
});

export { networkConfig, useNetworkVariable };