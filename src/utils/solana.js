import { Connection, PublicKey } from '@solana/web3.js';


export const connection = new Connection('https://api.devnet.solana.com','confirmed');

export const TOKEN_PROGRAM_ID = new PublicKey('A45U23GVnysTST345njr48eBKucEkjqZeuPCGD4obLrf');


export async function getTokenAccounts(publicKey) {
    const response = await connection.getParsedTokenAccountsByOwner(publicKey,{
        programId: TOKEN_PROGRAM_ID,
    });
    return response.value;
}