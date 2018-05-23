import web3 from './web3';
import * as VotingSystem from './build/VotingSystem.json';

export default new web3.eth.Contract(JSON.parse(VotingSystem.interface), "0xf11bD3ffC6b8c3B9425047b52CF450F90bc5F5dc");