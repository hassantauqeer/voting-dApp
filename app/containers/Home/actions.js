/*
 *
 * Home actions
 *
 */

import {
    LOAD_DATA, SAVE_DATA, SAVE_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT, META_MASK_RESPONSE,
    SET_TASK_DATA, CREATE_TASK, REGISTER_ADDRESS, REGISTER_ADDRESS_LOADING, SET_MEMBERS_LENGTH,
    SAVE_TASKS, UPDATE_TASKS, ADD_NEW_TASK
} from './constants';

export function loadData() {
  return {
    type: LOAD_DATA,
  };
}

export function loadCurrentAccount() {
  return {
    type: LOAD_CURRENT_ACCOUNT,
  };
}

export function saveData(payload) {
  return {
    type: SAVE_DATA,
      payload
  };
}

export function saveCurrentAcc(payload) {
  return {
    type: SAVE_CURRENT_ACCOUNT,
      payload
  };
}

export function metaMaskResponse(payload) {
  return {
    type: META_MASK_RESPONSE,
      payload
  };
}

export function setTaskData(payload) {
  return {
    type: SET_TASK_DATA,
      payload
  };
}

export function createTask() {
  return {
    type: CREATE_TASK,
  };
}

export function registerAddress() {
  return {
    type: REGISTER_ADDRESS,
  };
}

export function handleAddressRegLoading(payload) {
  return {
    type: REGISTER_ADDRESS_LOADING,
      payload
  };
}

export function setMembersLength(payload) {
  return {
    type: SET_MEMBERS_LENGTH,
      payload
  };
}

export function saveTasks(payload) {
  return {
    type: SAVE_TASKS,
      payload
  };
}

export function updateTasks(payload) {
  return {
    type: UPDATE_TASKS,
      payload
  };
}
export function addNewTask(payload) {
  return {
    type: ADD_NEW_TASK,
      payload
  };
}
