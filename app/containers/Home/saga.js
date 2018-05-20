import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA, LOAD_CURRENT_ACCOUNT, CREATE_TASK, REGISTER_ADDRESS } from "./constants";
import makeSelectHome from "./selectors";
import { saveData, saveCurrentAcc, metaMaskResponse, saveTasks } from "./actions";
import web3 from '../../../Solidity_Contract/web3';
import instance from '../../../Solidity_Contract/VotingInstance';




async function getData() {

    const owner = await instance.methods.owner().call();
    const totalMembers = await instance.methods.totalMembers().call();
    const totalTasks = await instance.methods.getTotalTasks().call();
    const contractAddress = await instance._address;

    return {owner, totalTasks, totalMembers, contractAddress, contractLoaded: true};
}


async function getCurrentAccount() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}

async function loadTask (taskIndex) {
    let taskResp = await instance.methods.getTaskInfo(taskIndex).call();
    return {owner: taskResp[0], name: taskResp[1], endingTime: taskResp[2], voteCount: taskResp[3], approved: taskResp[4],  complete: taskResp[5]}
}

function* loadDataSaga() {
    const response = yield call(getData);
    yield put(saveData(response));
    const home = yield select(makeSelectHome());

    let tasksLength =  home.contractData.totalTasks;
    let taskList =  [];

    for (var i = 0; i< tasksLength; i ++) {
        let task = yield call(loadTask, i);
        taskList.push(task);
    }
    yield put(saveTasks(taskList));

}

function* loadCurrentAccountSaga() {
    const home = yield select(makeSelectHome());
    const currentAccount = yield call(getCurrentAccount);
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
        yield put(metaMaskResponse({running: true, loggedOut: false}));
        if(!currentAccount) {
            yield put(metaMaskResponse({running: true, loggedOut: true}));
        }
    }
    else {
        yield put(metaMaskResponse({running: false, loggedOut: true}));
    }
    if(home.currentAccountInfo.currentAccount !== currentAccount){
        const addressRegistered = yield call(checkAddressRegistered, currentAccount);
        yield put(saveCurrentAcc({currentAccount, addressRegistered}));
    }
}

async function checkAddressRegistered(address) {
    return await instance.methods.members(address).call();
}


// Individual exports for testing
export default function* defaultSaga() {
    yield takeLatest(LOAD_DATA, loadDataSaga);
    yield takeLatest(LOAD_CURRENT_ACCOUNT, loadCurrentAccountSaga);
    // See example in containers/HomePage/saga.js
}
