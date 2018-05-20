/**
 *
 * Home
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadData, loadCurrentAccount, updateTasks, addNewTask, setMembersLength,
    saveCurrentAcc, setTaskData, createTask, registerAddress } from './actions';
import NewTask from "../../components/NewTask/Loadable";
import RegisterAddress from "../../components/RegisterAddress/Loadable";
import TaskList from "../../components/TaskList/Loadable";

import { Row, Card, Col, Input, Alert, Button, Form, Icon, Tabs } from "antd";
const FormItem = Form.Item;
const { TabPane } = Tabs;


export class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
      super(props);
      this.state = {
          interval: '',
          timeDate: ''
      }
    }
    componentDidMount(){
      this.props.loadData();
        let interval = setInterval(this.loadCurrentAccount, 1000);
        this.setState({interval})
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    loadCurrentAccount = () => {
        this.setState({
            timeDate: Date.now()
        })
      this.props.loadCurrentAccount();
    }
  render() {
      let contractData = this.props.home.contractData;
      let metaMaskResponse = this.props.home.metaMaskResponse;
      let currentAccountInfo = this.props.home.currentAccountInfo;
    return (
        <div className="app">
          <div className="container">
            <Card loading={!contractData.contractLoaded} title="Voting Dapp" style={{ width: '100%', textAlign: 'center' }}>
              <Row>
                <Col className="custom-column" span={12} ><b>Contract Owner: </b>{contractData.owner}</Col>
                <Col className="custom-column"  span={12}><b>Contract Address: </b>{contractData.contractAddress}</Col>
              </Row>
              <Row style={{ margin: '15px auto'}}>
                <Col onClick={() => this.props.setMembersLength(10)} className="custom-column"  span={12}><b>Current Account: </b>{currentAccountInfo.currentAccount}

                {metaMaskResponse.running && metaMaskResponse.loggedOut &&
                <Alert type="error" message="Login with Metamask!" banner className="header-card-alert" />
                }
                {!metaMaskResponse.running &&
                <Alert type="error" message="Install Metamask!" banner />
                }

                <br/>
                    {currentAccountInfo.addressRegistered && !metaMaskResponse.loggedOut && <span className="reg"><Icon type="check-circle-o" /> Registered!</span>}
                    {!currentAccountInfo.addressRegistered && !metaMaskResponse.loggedOut && <span className="not-reg"><Icon type="check-circle-o" /> Not Registered!</span>}

                </Col>

                <Col className="custom-column"  span={6} ><b>Total Members: </b>{contractData.totalMembers}</Col>
                <Col className="custom-column"  span={6} ><b>Total Tasks: </b>{contractData.totalTasks}</Col>
              </Row>
            </Card>

              {!currentAccountInfo.addressRegistered && !metaMaskResponse.loggedOut && contractData.contractLoaded &&
                  <RegisterAddress {...this.props} />
              }


              {
                  currentAccountInfo.addressRegistered && !metaMaskResponse.loggedOut &&
                      <div>
                          <NewTask {...this.props} />
                          <TaskList timeDate={this.state.timeDate} {...this.props} />
                      </div>
              }




          </div>
        </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
      loadData: () => dispatch(loadData()),
      loadCurrentAccount: () => dispatch(loadCurrentAccount()),
      createTask: () => dispatch(createTask()),
      registerAddress: () => dispatch(registerAddress()),
      setTaskData: (payload) => dispatch(setTaskData(payload)),
      saveCurrentAcc: (payload) => dispatch(saveCurrentAcc(payload)),
      setMembersLength: (payload) => dispatch(setMembersLength(payload)),
      updateTasks: (payload) => dispatch(updateTasks(payload)),
      addNewTask: (payload) => dispatch(addNewTask(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Home);
