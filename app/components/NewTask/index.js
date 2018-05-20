/**
*
* NewTask
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Form, Icon, Input, Modal, Card, TimePicker, Button } from 'antd';
const FormItem = Form.Item;
import instance from '../../../Solidity_Contract/VotingInstance';
const confirm = Modal.confirm;

class NewTask extends React.Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            modal: ''
        }
    }



    confirmModal = () => {
        const self = this;
        confirm({
            title: "Creating Task",
            content: (
                <div>
                    Task: <b>{this.props.home.newTask.name}</b> will end on <i>{new Date(this.props.home.newTask.date).toString()}</i>.
                </div>
            ),
            onOk() {
                self.handleOk()
            },
            onCancel() {

            },
        });
    }

    handleOk = async () => {
        this.setState({loading: true});
        let taskResp = await instance.methods.createTask(this.props.home.newTask.name, this.props.home.newTask.date).send({from: this.props.home.currentAccountInfo.currentAccount, gas: '1000000'});
            console.log(taskResp, 'sss')
        if(taskResp.events.TaskCreated) {
                this.props.addNewTask({newTask: {owner: this.props.home.currentAccountInfo.currentAccount, name: this.props.home.newTask.name, endingTime: this.props.home.newTask.date, voteCount: 0, approved: false,  complete: false}, totalTasks: taskResp.events.TaskCreated.returnValues[0]});
            this.setState({loading: false});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields( async(err, fieldsValue) => {
            if (err) {
                return;
            }
            const values = {
                ...fieldsValue,
                'time': fieldsValue['time'].format('hh:mm'),
            };
            this.confirmModal();
            console.log('Received values of form: ', values);


        });
    }


    disabledMinutes = () => {
        let tempHours = this.props.form.getFieldValue('time') && this.props.form.getFieldValue('time')._d.getHours();
        let date = new Date;
        let arr=[];
        let hours = date.getHours();
        if(this.props.form.getFieldValue('time') === undefined) {
            var minutes = date.getMinutes();
            for (var i = 0; i <= minutes; i++) {
                arr[i] = i;
            }
            return arr;
        }
        if(tempHours === hours) {
            var minutes = date.getMinutes();
            for (var i = 0; i <= minutes; i++) {
                arr[i] = i;
            }
            return arr;
        }
        else {
            return arr;
        }
    }
    disabledHours = () => {
        var date = new Date;
        var arr=[];
        var hours = date.getHours();
        for (var i = 0; i < hours; i++) {
            arr[i] = i;
        }
        return arr;
    }

  render() {
    let contractData = this.props.home.contractData;
      const config = {
          rules: [{ type: 'object', required: true, message: 'Please select time!'}],
      };
      const { getFieldDecorator } = this.props.form;
      return (
      <Card loading={!contractData.contractLoaded} title="Create a new Task" style={{ width: '50%', textAlign: 'center', marginTop: 50 }}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
              className="custom-form-item"
              label="Task Name"
          >
              {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Task Name is Required!' }],
              })(
                  <Input onChange={(evt) => this.props.setTaskData({varName: 'name', val: evt.target.value})} prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Task Name" />
              )}
          </FormItem>
        <FormItem
            className="custom-form-item"
            label="Task will end at"
        >
            {getFieldDecorator('time', config)(
                <TimePicker onChange={(evt) => this.props.setTaskData({varName: 'date', val: evt._d.getTime()})}  minuteStep={3} format="HH:mm" disabledMinutes={this.disabledMinutes} disabledHours={this.disabledHours}/>
            )}
        </FormItem>
          <Button loading={this.state.loading} style={{width: '100%'}} type="primary" htmlType="submit" className="login-form-button">
            Create task
          </Button>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(NewTask);
