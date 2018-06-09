import web3 from './web3';
import * as VotingSystem from './build/VotingSystem.json';

export default new web3.eth.Contract(JSON.parse(VotingSystem.interface), "0xAF5FB00558115E004c45C218667213aC54bb46b7");