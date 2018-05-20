/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_DATA, SAVE_CURRENT_ACCOUNT, META_MASK_RESPONSE, SET_TASK_DATA, REGISTER_ADDRESS_LOADING,
    SET_MEMBERS_LENGTH, SAVE_TASKS, UPDATE_TASKS, ADD_NEW_TASK
} from './constants';

const initialState = fromJS({
    contractData: {
        owner: '',
        totalTasks: '',
        totalMembers: '',
        contractAddress: '',
        contractLoaded: false
    },
    currentAccountInfo: {},
    metaMaskResponse: {
        loggedOut: false,
        running: true
    },
    newTask: {
        name: '',
        date: ''
    },
    registerLoading: false,
    tasksList: []
});

function homeReducer(state = initialState, action) {
  switch (action.type) {

    case SAVE_DATA:
      return state.set('contractData', fromJS(action.payload));

    case SAVE_CURRENT_ACCOUNT:
      return state.set('currentAccountInfo', (fromJS(action.payload)));

      case META_MASK_RESPONSE:
        // console.log(action.payload, 'payload')
      return state.set('metaMaskResponse', fromJS(action.payload));

      case SET_TASK_DATA:
      return state.setIn(['newTask', action.payload.varName], action.payload.val);

      case REGISTER_ADDRESS_LOADING:
      return state.set('registerLoading', action.payload);

      case SET_MEMBERS_LENGTH:
      return state.setIn(['contractData', 'totalMembers'], action.payload);

      case SAVE_TASKS:
      return state.set('tasksList', fromJS(action.payload));

      case UPDATE_TASKS:
          let length = state.getIn(['contractData', 'totalTasks']);
          let tasksList = state.get('tasksList').toJS();
          let arr1 = tasksList.slice(0, action.payload.updatedTaskIndex);
          arr1.push(action.payload.updatedTask)
          console.log(arr1, tasksList)
          let arr2 = tasksList.slice(action.payload.updatedTaskIndex+1, length);
      return state.set('tasksList', fromJS(arr1.concat(arr2)));

      case ADD_NEW_TASK:
          tasksList = state.get('tasksList').toJS();
          tasksList.push(action.payload.newTask)

      return state.set('tasksList', fromJS(tasksList)).setIn(['contractData', 'totalTasks'], action.payload.totalTasks);

    default:
      return state;
  }
}

export default homeReducer;
