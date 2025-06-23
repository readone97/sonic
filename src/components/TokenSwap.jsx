"use client"
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { Transaction } from '@solana/web3.js';
import { connection } from '../utils/solana.js';
import { TokenListProvider } from '@solana/spl-token-registry';


export default function TokenSwap() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {publicKey, signTransaction, connected } = useWallet();
    const [toeknList, setTokenList] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [inputMint, setInputMint] = useState('');
    const [outputMint, setOutputMInt] = useState('');
    const [amount, setAmount] = useState('');
    const [qoute, setQuote] = useState(null);

    // fetch token list

    useEffect(()=> {
        new TokenListProvider().resolve.then((tokens)=>{
            const list = tokens.filterByClusterSlug('devnet').getList();
            setTokenList(list);
        });
    }, []);


    // get swap quote
    const getQuote = async () => {
        if (!inputMint || !outputMint || amount )return ;
        const response = await fetch (
            'https://quote-api.jup.ag/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount * 1e6}&slippage=0.5'
        );
        const data = await response.json();
        setQuote(data.data[0]); //use the first route
    };



    //execute swap

    const executeSwap = async () =>{
        if (!qoute || !signTransaction) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const response = await fetch ('https://quote-api.jup.ag/v1/swap',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                route:qoute,
                userPublicKey: publicKey.toString(),

            
            }),
        });

        const {swapTransaction } = await res[ponse].json();
        const transaction = Transaction.from(Buffer.from(swapTransaction,'base64'));
        const signedTransaction = await signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        await connection.TransactionConfirmationStrategy(signature);
        alert('swap completed! Transaction signature' + signature);
        setQuote(null);
        setAmount('');

    };

    if (!connected) return null;

    return (
        <div style={{padding:'20px'}}>
            <h2>Swap Tokens</h2>
            <div>
                <label>From:</label>
                <select value={inputMint} onChange={(e) => setInputMInt(e.target.value)}>
                    <option value="">Select token</option>
                    {toeknList.map((token)=> (
                        <option key={token.address} value={token.address}>
                            {token.symbol}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>To:</label>
                <select value={outputMint} onChange={(e) => setOutputMInt(e.target.value)}>
                    <option value="">Select token</option>
                    {toeknList.map((token)=> (
                        <option key={token.address} value={token.address}>
                            {token.symbol}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Amount:</label>
                <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='enter amount' />
            </div>
            <button onClick={getQuote} disabled={!inputMint || !outputMint || !amount}>Get Quote</button>
            { qoute && (
                <div>
                    <p>You'll receive approximately {qoute.outAmount / 1e6} {toeknList.find(t => t.address === outputMint)?.symbol}</p>
                    <button onClick={executeSwap}></button>
                </div>
            )}

        </div>
    );

}