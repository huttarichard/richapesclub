const contractAddressFromInput = document.getElementById('astrologyclub_contract_address').value
const contractAddressFromEnv = process.env.REACT_APP_CONTRACT_ADDRESS

const chainIdFromInput = document.getElementById('astrologyclub_chain_id').value
const chainIdFromEnv = process.env.REACT_APP_CHAIN_ID

const chainNameFromInput = document.getElementById('astrologyclub_chain_name').value
const chainNameFromEnv = process.env.REACT_APP_CHAIN_NAME

const config = {
  contractAddress:  contractAddressFromInput || contractAddressFromEnv,
  chainId:  chainIdFromInput || chainIdFromEnv,
  chainName: chainNameFromInput || chainNameFromEnv,
  infuraID: "cbb17e1c9af54ec1b90e007ed4854ffe",
}

export default config