"use client"

import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { connection, getTokenAccounts } from '../utils/solana.js';
import { TokenListProvider } from '@solana/spl-token-registry';


export default function Dashboard(){

    const { publicKey, connected } = useWallet();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [balance, setBalance] = useState(null);
    const [tokenAccounts, setTokenAccounts] = useState([]);
    const [tokenMap, setTokenMap] =  useState({});


    //fetch token list for symbols
    useEffect(()=>{
        new TokenListProvider().resolve().then((tokens) => {
            const list = tokens.filterByClusterSlug('devnet').getList();
            const map = list.reduce((acc, token) => {
                acc[token.address] = token;
                return acc;
            }, {});
            setTokenMap(map);
        });
    },[]);


    //fetch wallet data 
    useEffect(() => {
        if (connected && publicKey) {
            //get sol balance 
            connection.getBalance(publicKey).then((accounts) => {
                setTokenAccounts(accounts);
            });
        }
    }, [connected, publicKey]);

    if (!connected) return null;

    return (
        <div style={{ padding:'20px'}}>
            <h1>Dashboard</h1>
            <p><strong>Wallet Address:</strong>{publicKey.toString}</p>
            <p><strong>Balance:</strong>{balance !== null ? `${balance} SOL` : 'Loading...'}</p>
            <h2>SPL Tokens</h2>
            {tokenAccounts.length > 0 ? (
                <ul>
                    {tokenAccounts.map((account) => {
                        const mint = account.account.data.parsed.info.mint;
                        const amount = account.account.data.parsed.info.tokenAmount.uiAmount;
                        const tokenInfo = tokenMap[mint];
                        const symbol =tokenInfo ? tokenInfo.symbol : 'Unkown';

                        return(
                            <li key={account.pubkey.toString()}>
                                {symbol}: {amount}
                            </li>
                        );
                    })}
                </ul>
            ): (
                <p>No SPL tokens found or loading ....</p>
            
            )}
        </div>
    );
}