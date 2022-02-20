import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components'
import { WalletContext } from '../contexts/walletContext';
import Close from './Close'

const ModalBase = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 2rem;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, .1);
`

const ModalWrapper = styled.div`
  position: relative;
  max-width: 400px;
  padding: 3rem 3rem 2rem 3rem;
  background-color: #000;
  
  h2 {
    margin: 0 0 2rem;
    text-align: center;
    font-family: "Poppins", sans-serif;
    color: #fff;
    font-size: 3rem;
  }
`

const ModalClose = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
`

const ModalFormDesc = styled.div`
  margin-bottom: 2rem;

  p {
    color: #fff;
    text-align: center;
  }

  span {
    font-weight: 700;
  }
`

const ModalFormMessage = styled.p`
  margin: 0;
  min-height: 18px;
  color: #fff;
`

const StyledButton = styled.button`
  width: 100%;
  border: 0;
  background: #fff;
  color: #000;
  font-family: "Poppins", sans-serif;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: opacity .3s;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

function ClaimModal({show, handleClose}) {
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [toClaimAmount, setToClaimAmount] = useState(0);
  const { wallet, connectWallet } = useContext(WalletContext);

  useEffect(() => {
    if (!wallet) {
      return
    }

    const checkConditions = async () => {
      const publicState = await wallet.getPublicState()

      if (!publicState) {
        setDisabled(true)
        setMessage('Claiming disabled. Come back later.')

        return
      }

      const claimed = await wallet.getClaimed()

      if (claimed) {
        setDisabled(true)
        setMessage('Already claimed!')

        return
      }

      const amount = await wallet.getExternalBalanceOf()

      if (amount === 0) {
        setDisabled(true)
        setMessage('Nothing to claim')

        return
      }

      setToClaimAmount(amount)

      const totalSupply = await wallet.getTotalSupply()
      const maxMintSupply = await wallet.getMaxMintSupply()
      const limitPerWallet = await wallet.getLimitPerWallet()
      const amountMinted = await wallet.getBalanceOf()

      if (maxMintSupply - totalSupply === 0) {
        setDisabled(true)
        setMessage('Max supply exceeded')

        return
      } else {
        if (amountMinted >= limitPerWallet) {
          setDisabled(true)
          setMessage(`You reached the limit of ${limitPerWallet} per wallet`)

          return
        }
      }
    }

    checkConditions()
  }, [wallet])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);
    setMessage('claiming...');

    try {
      const res = await wallet.claim();
      if (res.status) {
        connectWallet()
        setMessage('Congrats, claiming process completed!');

        handleClose()
      } else {
        setMessage('Something went wrong, try again later.');
      }
    } catch (e) {

      if (e.code === -32000) {
        setMessage('You have insufficient funds in your wallet.');
      } else {
        setMessage('Something went wrong, try again later.');
      }
    }

    setDisabled(false);
  };

  if (show) {
    return (
    <ModalBase onClick={handleClose}>
      <ModalWrapper onClick={e => e.stopPropagation()}>
        <ModalClose>
          <Close onClick={handleClose} />
        </ModalClose>
        <h2>Claim</h2>
        <form onSubmit={handleSubmit}>
          <ModalFormDesc>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet vitae modi dolorem perferendis magnam aliquam pariatur dolorum saepe blanditiis commodi?</p>
            <p><span>You are allowed to claim {toClaimAmount} Rich Apes</span></p>
          </ModalFormDesc>
          <StyledButton type="submit" disabled={disabled}>Claim</StyledButton>
          <ModalFormMessage>{message}</ModalFormMessage>
        </form>
      </ModalWrapper>
    </ModalBase>
    )
  } else {
    return<></>
  }
}

export default ClaimModal;