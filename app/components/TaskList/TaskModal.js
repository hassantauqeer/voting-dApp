import React, {Component} from 'react';
import { Form, Tooltip, Row, Col, Icon, Input, Modal, Card, TimePicker, Button } from 'antd';
import instance from '../../../Solidity_Contract/VotingInstance';

class TaskModal extends React.Component {

    castVote = async (vote) => {
        console.log('vv')
        let resp = await instance.methods.castVote(this.props.taskIndex, vote).send({from: this.props.currentAccount, gas: '1000000'});
        console.log(resp, resp.events.VoteCasted.returnValues)
        if (resp.events.VoteCasted) {
            let taskResp = resp.events.VoteCasted.returnValues;
            let updatedTask = {owner: taskResp[0], name: taskResp[1], endingTime: taskResp[2], voteCount: taskResp[3], approved: taskResp[4],  complete: taskResp[5]};
            this.props.updateTasks({updatedTask, updatedTaskIndex: this.props.taskIndex});
        }
    }
    finalizeTask = async () => {
        let resp = await instance.methods.finalizeTask(this.props.taskIndex).send({from: this.props.currentAccount, gas: '1000000'});
        console.log(resp, 'resp')
        const task = this.props.task;

        if(resp.transactionHash) {
            let updatedTask = {owner: task.owner, name: task.name, endingTime: task.endingTime, voteCount: task.voteCount, approved: task.approved,  complete: true};
            this.props.updateTasks({updatedTask, updatedTaskIndex: this.props.taskIndex});
        }
    }
    render() {
        const task = this.props.task;
        return (
            <div>
                <Modal
                    title={task.name}
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                    className="task-model"
                    cancelText="Close"
                >
                    <Row style={{margin: '10px auto'}}>
                        <b>Owner: </b>{task.owner}
                    </Row>
                    <Row style={{margin: '10px auto'}}>
                        <b>Description:</b> No Description available yet...
                    </Row>
                    <Row style={{margin: '10px auto'}}>
                        <b>End Time:</b> {new Date(parseInt(task.endingTime)).toTimeString()}
                    </Row>
                    <Row style={{margin: '10px auto'}}>
                        <Col span={12}>
                            <b>Approval status: </b>
                            {task.approved  && (task.complete || this.props.timeDate > parseInt(task.endingTime)) && <span style={{color: "#52c41a"}}><b>Approved</b></span>}
                            {!task.approved && (task.complete || this.props.timeDate > parseInt(task.endingTime)) && <span style={{color: "#f5222d"}}><b>Not Approved</b></span>}
                            {!task.approved && !task.complete && (this.props.timeDate < parseInt(task.endingTime)) && <span style={{color: "#FADB14"}}><b>In Progress</b></span>}
                        </Col>
                        {!task.approved && !task.complete && (this.props.timeDate < parseInt(task.endingTime)) &&
                        <div>
                                <Col offset={6} span={2}>
                                    <Tooltip placement="topLeft" title="Up Vote">
                                        <Button onClick={this.castVote.bind(this, true)} type="primary" shape="circle" icon="up" />
                                    </Tooltip>
                                </Col>
                                <Col>
                                    <Tooltip placement="topLeft" title="Down Vote">
                                        <Button onClick={this.castVote.bind(this, false)} type="danger" shape="circle" icon="down" />
                                    </Tooltip>
                                </Col>
                            </div>
                        }
                    </Row>
                    {!task.complete && this.props.currentAccount === task.owner && this.props.timeDate > parseInt(task.endingTime) && <Row style={{margin: '10px auto'}}>
                        <Button onClick={this.finalizeTask}>
                            Finalize Task
                        </Button>
                    </Row>}
                </Modal>
            </div>
        )
    }
}

export default TaskModal;