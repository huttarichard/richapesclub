import React from 'react';
import { createContext, useState } from 'react';
import { abi } from '../contracts/RichApesClub.json';
import config from '../config'

export const ContractContext = createContext({
  contract: null,
  setContract: () => {},
});

export function ContractContextProvider({ children }) {
  const [contract, setContract] = useState(
    new window.web3.eth.Contract(abi, config.callerContractAddress)
  );

  const value = {
    contract,
    setContract,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
}
