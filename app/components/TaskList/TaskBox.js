import React, {Component} from 'react';
import { Form, Tooltip, Row, Col, Icon, Input, Modal, Card, TimePicker, Button } from 'antd';
import moment from "moment";
import TaskModal from "./TaskModal";
class TaskBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            voted: false,
            extra: ''
        }
    }
    componentDidMount() {
        let extra = this.handleLabel(this.props.task);
        this.setState({extra});
    }
    openModal = () => {
        this.setState({visible: true})
    }
    handleOk = () => {
        this.setState({visible: false})
    }

    handleCancel = () => {
        this.setState({visible: false})
    }

    handleLabel = (task) => {
        if(this.props.timeDate > parseInt(parseInt(task.endingTime)) && !task.approved) {
            console.log('1')
            return (<span style={{color: '#f5222d'}}>Not Approved</span>)
        }
        else if(this.props.timeDate > parseInt(parseInt(task.endingTime) && task.approved && task.complete)) {
            console.log('2')
            return (<span style={{color: '#52c41a'}}>Approved</span>)
        }
        else {
            console.log('3')
            var now = moment(); // today's date
            var end = moment(parseInt(task.endingTime)); // end date
            var duration = moment.duration(end.diff(now));
            let temp ={};
            if (duration > 0) {
                temp = {h: Math.floor(duration.asHours()), m: Math.floor(duration.minutes()), s: Math.floor(duration.seconds())}
            }
            return (<span>Ending In: <b>{temp.h}</b><sub>Hours</sub> <b>{temp.m}</b><sub>Minutes</sub> <b>{temp.s}</b><sub>Sec</sub></span>)
        }
    }

    render() {
        const {task} = this.props;
        var now = moment(); // today's date
        var end = moment(parseInt(task.endingTime)); // end date
        var duration = moment.duration(end.diff(now));
        let temp ={};
        if (duration > 0) {
            temp = {h: Math.floor(duration.asHours()), m: Math.floor(duration.minutes()), s: Math.floor(duration.seconds())}
        }
        return (
            <div>
                <Card onClick={this.openModal} className="individual-task" title={task.name} bordered={false}
                      extra={
                          ((this.props.timeDate > parseInt(parseInt(task.endingTime)) && !task.approved) || (!task.approved && task.complete)) ? <span style={{color: '#f5222d'}}>Not Approved</span> :
                              task.approved ? <span style={{color: '#52c41a'}}>Approved</span> : <span>Ending In: <b>{temp.h}</b><sub>Hours</sub> <b>{temp.m}</b><sub>Minutes</sub> <b>{temp.s}</b><sub>Sec</sub></span>
                      }
                >
                    <Row>
                        <Col span={19}>
                            No Description yet....
                        </Col>
                        <Col span={5}>
                            <Button type="primary"><b>{task.voteCount}</b> &nbsp; Votes</Button>
                        </Col>
                    </Row>
                </Card>

                <TaskModal
                    visible={this.state.visible}
                    handleCancel={this.handleCancel}
                    handleOk={this.handleOk}
                    task={task}
                    currentAccount={this.props.currentAccount}
                    timeDate={this.props.timeDate}
                    taskIndex={this.props.taskIndex}
                    updateTasks={this.props.updateTasks}
                />


            </div>
        )
    }
}

export default TaskBox;