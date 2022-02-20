import React, {useContext} from 'react';
import styled from 'styled-components'
import { WalletContext } from '../contexts/walletContext';

const Wrapper = styled.div`
  /* margin-right: 1rem; */
`

const StyledButton = styled.button`
  border: 0;
  background: #fff;
  color: #000;
  font-family: "Poppins", sans-serif;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  transition: opacity .3s;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }
`

const ConnectedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`

const NotConnectedWrapper = styled.div`
  text-align: right;
`

const WalletWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  span {
    color: #fff;
    cursor: default;

    &:first-child {
      margin-right: 5px;
    }
  }
`

const MintWrapper = styled.div`
  button {
    &:first-child {
      margin-right: 1rem;
    }
  }

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