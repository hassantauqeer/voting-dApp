import web3 from './web3';
import * as VotingSystem from './build/VotingSystem.json';

export default new web3.eth.Contract(JSON.parse(VotingSystem.interface), "0x1B9cecd054e6Efc6061F8b534F17200c5633DA36");