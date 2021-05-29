/* Smart Contract Service Apis*/
import Web3 from 'web3'
import StakBank from './artifacts/artifacts/contracts/StakBank.sol/StakBank.json'

const deployedAddress = '0x927807195C8246AB8416dcd90ae6f2931321B8b5';
//connectToMetaMask
export const connectToMetaMask = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
}

// getCurrentMetaMaskAccount
export const getCurrentMetaMaskAccount = (callback) => {
    
}

// getAccountBalance
export const getAccountBalance = (address, callback) => {
    console.log(address);
    window.web3.eth.getBalance(address, "latest").then((result) => {
        callback(result);
    });
}

// getPoolInfo
export const getPoolInfo = (name, callback, error) => {
    let contract = new window.web3.eth.Contract(StakBank.abi, deployedAddress);
    console.log(contract);
    try {
      contract.methods.pools(name).call().then((poolInfo) => {
        console.log(poolInfo);
        callback(poolInfo);
      })
    } catch(err) {
        error(err);
    }
}