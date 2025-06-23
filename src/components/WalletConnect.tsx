
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

  const connectWallet = () => {
    // This is a mock implementation
    // In a real app, you would integrate with MetaMask or another wallet provider
    if (isConnected) {
      setIsConnected(false);
      setWalletAddress('');
      
      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected successfully.",
      });
      return;
    }

    // Simulate connection
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(16).substring(2, 14) + '...';
      setIsConnected(true);
      setWalletAddress(mockAddress);
      
      toast({
        title: "Wallet connected",
        description: "Your wallet has been connected successfully.",
      });
    }, 500);
  };

  return (
    <Button 
      onClick={connectWallet}
      variant={isConnected ? "outline" : "default"}
      className={`font-medium ${isConnected ? 'text-green-600 border-green-600' : 'bg-agri-green hover:bg-agri-green/90'}`}
    >
      <Wallet size={16} className="mr-2" />
      {isConnected ? walletAddress : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnect;
