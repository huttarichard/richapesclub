// eslint-disable-next-line no-undef
const NFT = artifacts.require('RichApesClub.sol');

module.exports = function(deployer) {
  deployer.deploy(NFT);
};