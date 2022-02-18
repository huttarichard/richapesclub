import Web3Modal from 'web3modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
import config from '../config';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: config.infuraID,
    }
  }
};

class Wallet {
  constructor(provider, modal, contract) {
    this.modal = modal;
    this.provider = provider;
    this.contract = contract;
  }

  static async Connect(contract) {
    const modal = new Web3Modal({
      network: config.chainName,
      cacheProvider: true,
      providerOptions,
      theme: "dark"
    });

    const provider = await modal.connect();

    window.web3.setProvider(provider);

    return new Wallet(provider, modal, contract);
  }

  get address() {
    return this.provider.selectedAddress;
  }

  async balance() {
    let data = await window.web3.eth.getBalance(this.address);
    return window.web3.utils.fromWei(data);
  }

  async getBalanceOf() {
    return this.contract.methods.balanceOf(this.address).call();
  }

  async getExternalBalanceOf() {
    return this.contract.methods.externalBalanceOf(this.address).call();
  }

  async getPublicState() {
    return this.contract.methods.publicState().call();
  }

  async getLimitPerWallet() {
    return this.contract.methods.limitPerWallet().call();
  }

  async getTotalSupply() {
    return this.contract.methods.totalSupply().call();
  }

  async getMaxMintSupply() {
    return this.contract.methods.maxMintSupply().call();
  }

  async mint(quantity) {
    const call = this.contract.methods.mint(quantity);

    const quantityBN = new window.web3.utils.BN(quantity)
    const priceBN = new window.web3.utils.BN('77700000000000000')

    const value = quantityBN.mul(priceBN).toString()

    const transactionObject = {
      from: this.address,
      to: this.contract._address,
      data: call.encodeABI(),
      value: value,
    }

    return window.web3.eth.sendTransaction(transactionObject);
  }

  async claim() {
    const call = this.contract.methods.claim();

    const transactionObject = {
      from: this.address,
      to: this.contract._address,
      data: call.encodeABI(),
      value: 0,
    }

    return window.web3.eth.sendTransaction(transactionObject);
  }

  disconnect() {
    this.modal.clearCachedProvider();
  }
}

export default Wallet;
