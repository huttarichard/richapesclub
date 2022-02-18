import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import Wallet from '../services/wallet';
import { ContractContext } from '../contexts/contractContext';
import config from '../config'

export const WalletContext = createContext({
  wallet: null,
  isMainnet: false,
  disconnectWallet: () => {},
  connectWallet: () => {},
});

export function WalletContextProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const { contract } = useContext(ContractContext);

  const disconnectWallet = async () => {
    await wallet.disconnect();

    setWallet(null);
  };

  const connectWallet = async () => {
    if (!contract) {
      return
    }

    try {
      const w = await Wallet.Connect(contract);

      setWallet(w);
    } catch (e) {
      // console.log(e);
    }
  };

  const isMainnet = wallet?.provider?.chainId === config.chainId;

  const value = {
    wallet,
    isMainnet,
    connectWallet,
    disconnectWallet,
  };

  useEffect(() => {
    async function getWallet() {
      try {
        const w = await Wallet.Connect(contract);

        setWallet(w);
      } catch (e) {
        // console.log(e);
      }
    }

    if (!contract) {
      return
    }

    getWallet();
  }, [contract]);

  wallet?.provider.on('chainChanged', () => {
    connectWallet();
  });

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
