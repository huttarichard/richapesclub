const calleeContractAddressFromInput = document.getElementById('callee_contract_address')?.value
const calleeContractAddressFromEnv = process.env.REACT_APP_CALLEE_CONTRACT_ADDRESS

const callerContractAddressFromInput = document.getElementById('caller_contract_address')?.value
const callereContractAddressFromEnv = process.env.REACT_APP_CALLER_CONTRACT_ADDRESS

const chainIdFromInput = document.getElementById('richapesclub_chain_id')?.value
const chainIdFromEnv = process.env.REACT_APP_CHAIN_ID

const chainNameFromInput = document.getElementById('richapesclub_chain_name')?.value
const chainNameFromEnv = process.env.REACT_APP_CHAIN_NAME

const config = {
  calleeContractAddress:  calleeContractAddressFromInput || calleeContractAddressFromEnv,
  callerContractAddress:  callerContractAddressFromInput || callereContractAddressFromEnv,
  chainId:  chainIdFromInput || chainIdFromEnv,
  chainName: chainNameFromInput || chainNameFromEnv,
  infuraID: "cbb17e1c9af54ec1b90e007ed4854ffe",
}

export default config