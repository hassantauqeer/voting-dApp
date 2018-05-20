const fs = require('fs-extra');
const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const VotingSystem = require('./build/VotingSystem.json');

const votingInstance = path.resolve(__dirname, 'VotingInstance.js');
fs.removeSync(votingInstance);


const provider = new HDWalletProvider(
  'clown shiver beach wheel this mixture emotion illness fatigue amateur talent bitter',
  'https://rinkeby.infura.io/TnLV7HlGk5SeiboICQWq'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  // console.log(VotingSystem.bytecode)
  // console.log(VotingSystem.interface)
  const result = await new web3.eth.Contract(
    JSON.parse(VotingSystem.interface)
  )
    .deploy({ data: VotingSystem.bytecode }) // Deploying Contract
    .send({ gas: '4712388', from: accounts[0] });
    console.log('Contract deployed to: ', result.options.address);
    fs.writeFile("./Solidity_Contract/VotingInstance.js", votingInstanceContent(result.options.address));
};
deploy();


function votingInstanceContent (address) {
  return (
`import web3 from './web3';
import * as VotingSystem from './build/VotingSystem.json';

export default new web3.eth.Contract(JSON.parse(VotingSystem.interface), "${address}");`
  )
}