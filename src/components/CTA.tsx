
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

// Type definition for window with ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleLaunchApp = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts && accounts.length > 0) {
          // Navigate to dashboard if wallet is connected
          toast({
            title: "Wallet Connected",
            description: "Successfully connected to your wallet.",
          });
          
          // Navigate to dashboard
          navigate('/dashboard');
        } else {
          toast({
            title: "Wallet Required",
            description: "Please connect your wallet to access the app.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "MetaMask Not Found",
          description: "Please install MetaMask to connect your wallet.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to your wallet. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="py-20 mb-24 dark:bg-lending-darker light:bg-gray-100 transition-colors duration-300" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="cta-card opacity-0 transform translate-y-10 transition-all duration-700 rounded-xl overflow-hidden shadow-lg border-2 dark:border-lending-border light:border-indigo-400">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8 dark:bg-lending-card light:bg-white light:border-r light:border-indigo-200">
              <h2 className="text-3xl font-bold mb-3 dark:text-white light:text-gray-800 animate-fade-in">Ready to Start?</h2>
              <p className="dark:text-gray-300 light:text-gray-600 mb-5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Join LenDiverse today and experience the future of borderless finance.
              </p>
              <Button 
                className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white flex items-center gap-2 px-6 py-6 transition-all duration-300 hover:translate-x-1 shadow-md animate-fade-in"
                style={{ animationDelay: '0.4s' }}
                onClick={handleLaunchApp}
              >
                Launch App
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-gradient-to-r from-lending-primary to-lending-accent hidden md:flex relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDEwMGMwLTUwIDUwLTUwIDUwIDBzLTUwIDUwLTUwIDB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-20 animate-bg-shift"></div>
              <div className="h-full p-8 w-full flex items-center justify-center relative z-10">
                <div className="text-white w-full">
                  <h3 className="text-xl font-bold mb-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>Currently Supporting</h3>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="backdrop-blur-sm p-2 rounded-lg border-2 border-white/50 bg-white/20 hover:bg-white/30 hover:border-white/70 transition-all duration-300 hover:scale-105 shadow-md animate-fade-in" style={{ animationDelay: '0.4s' }}>
                      <p className="font-semibold">Base</p>
                    </div>
                    <div className="backdrop-blur-sm p-2 rounded-lg border-2 border-white/50 bg-white/20 hover:bg-white/30 hover:border-white/70 transition-all duration-300 hover:scale-105 shadow-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
                      <p className="font-semibold">Optimism</p>
                    </div>
                    <div className="backdrop-blur-sm p-2 rounded-lg border-2 border-white/50 bg-white/20 hover:bg-white/30 hover:border-white/70 transition-all duration-300 hover:scale-105 shadow-md animate-fade-in" style={{ animationDelay: '0.6s' }}>
                      <p className="font-semibold">Arbitrum</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
