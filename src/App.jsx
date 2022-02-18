import React, { useState } from 'react';
import { ContractContextProvider } from './contexts/contractContext.jsx';
import { WalletContextProvider } from './contexts/walletContext.jsx';
import Wallet from './components/Wallet';
import MintModal from './components/MintModal';
import ClaimModal from './components/ClaimModal';

function App(){
  const [showMintModal, setShowMintModal] = useState(false)
  const [showClaimModal, setShowClaimModal] = useState(false)

  return (
    <ContractContextProvider>
      <WalletContextProvider>
        <Wallet showMintModal={() => setShowMintModal(true)} showClaimModal={() => setShowClaimModal(true)} />
        <MintModal show={showMintModal} handleClose={() => setShowMintModal(false)} />
        <ClaimModal show={showClaimModal} handleClose={() => setShowClaimModal(false)} />
      </WalletContextProvider>
    </ContractContextProvider>
  )
}
export default App;