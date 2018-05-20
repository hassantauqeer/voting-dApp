/**
*
* TaskList
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Form, Icon, Input, Modal, Card, TimePicker, Button } from 'antd';
const FormItem = Form.Item;
import instance from '../../../Solidity_Contract/VotingInstance';
const confirm = Modal.confirm;
import TaskBox from "./TaskBox";

class TaskList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
      let tasksList = this.props.home.tasksList;
      let contractData = this.props.home.contractData;
      let currentAccount = this.props.home.currentAccountInfo.currentAccount;
      const self = this;
      return (
        <Card loading={!contractData.contractLoaded} title="All Tasks" style={{ width: '50%', textAlign: 'center', marginTop: 50 }}>
            {
                tasksList.map(function (task, index) {
                    return(
                        <TaskBox taskIndex={index} timeDate={self.props.timeDate} task={task} key={index} currentAccount={currentAccount} updateTasks={self.props.updateTasks}/>
                    )
                })
            }
        </Card>
    );
  }
}

TaskList.propTypes = {

};

export default TaskList;
