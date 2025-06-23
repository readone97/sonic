// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useWallet  } from "@solana/wallet-adapter-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';


export default function WalletConnector() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { connected } = useWallet();

    return (
        <div style={{margin:'20px'}}>
            <WalletMultiButton />
            {!connected && <p>Please connect your wallet to continue.</p>}

        </div>
    );
}