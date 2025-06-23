"use client"

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

// // Default styles for wallet modal
// import "@solana/wallet-adapter-react-ui/styles.css";

 import Index from "./pages/Index";
 import Token from "./pages/Token";
 import Swap from "./pages/Swap";
 import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {

    

    const network = WalletAdapterNetwork.Devnet; // Use Mainnet or Testnet as needed
    const endpoint = clusterApiUrl(network);

      // Initialize wallets
    const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter(),];

    return(
      <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Your app components */}
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
               <Route path="/" element={<Index />} />
              <Route path="/token" element={<Token />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
          
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    )
  
};

export default App;





// import { useMemo } from "react";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";
// //import { TooltipProvider } from "./components/ui/tooltip";
// // import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";

// // Default styles that can be overridden by your app
// // eslint-disable-next-line @typescript-eslint/no-require-imports
// require("@solana/wallet-adapter-react-ui/styles.css");


// // imports here

// const App =() => {
 
//     const network = WalletAdapterNetwork.Devnet;
//     const endpoint = useMemo(() => clusterApiUrl(network), [network]);
//     const wallets = useMemo(
//       () => [
//         // manually add any legacy wallet adapters here
//         // new UnsafeBurnerWalletAdapter(),
//       ],
//       [],
//     );
   
  
//     return (
//       <ConnectionProvider endpoint={endpoint}>
//         <WalletProvider wallets={wallets} autoConnect>
//           <WalletModalProvider>
//           <QueryClientProvider client={QueryClient}>
//             <TooltipProvider>
//             <Toaster />
//             <Sonner />
//             <BrowserRouter>
//               <Routes>
//                <Route path="/" element={<Index />} />
//               <Route path="/token" element={<Token />} />
//               <Route path="/swap" element={<Swap />} />
//               <Route path="*" element={<NotFound />} />
//           </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
    
            
//             </WalletModalProvider>
//         </WalletProvider>
//       </ConnectionProvider>
//     );
//   };
//   export default App;





