import web3 from './web3';
import * as VotingSystem from './build/VotingSystem.json';

export default new web3.eth.Contract(JSON.parse(VotingSystem.interface), "0x3323540285595069860F136671D11cEa69d99A0e");