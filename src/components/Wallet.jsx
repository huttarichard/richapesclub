import React, {useContext} from 'react';
import styled from 'styled-components'
import { WalletContext } from '../contexts/walletContext';

const Wrapper = styled.div`
  /* margin-right: 1rem; */
`

const StyledButton = styled.button`
  border: solid 1px #fff;
  background: transparent;
  color: #fff;
  font-family: "Poppins", sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  padding: 6px 12px;
  transition: all .3s;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`

const ConnectedWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const NotConnectedWrapper = styled.div`
  text-align: right;
`

const WalletWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1rem;
  span {
    color: #fff;
    font-size: 10px;
    cursor: default;
  }
`

const MintWrapper = styled.div`
  span {
    color: #fff;
    font-size: 11px;
    font-style: italic;
  }
`

function Wallet({showMintModal, showClaimModal}) {
  const { wallet, isMainnet, connectWallet } = useContext(WalletContext);

  return <Wrapper>
    {wallet && wallet.address ? (
      <ConnectedWrapper>
        <WalletWrapper>
          <span>wallet:</span>
          <span title={wallet.address}>{wallet.address.substring(0, 10)}...</span>
        </WalletWrapper>
        <MintWrapper>
          {isMainnet ? (
            <>
              <StyledButton onClick={showMintModal}>Mint</StyledButton>
              <StyledButton onClick={showClaimModal}>Claim</StyledButton>
            </>

          ) : (
            <span>Switch to mainnet</span>
          )}
        </MintWrapper>
      </ConnectedWrapper>
    ) : (
      <NotConnectedWrapper>
        <StyledButton onClick={connectWallet}>Connect Wallet</StyledButton>
      </NotConnectedWrapper>
    )}
  </Wrapper>
}
export default Wallet;