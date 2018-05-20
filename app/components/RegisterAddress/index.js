/**
*
* RegisterAddress
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Row, Card, Col, Input, Alert, Button, Form, Icon, Tabs } from "antd";
import web3 from '../../../Solidity_Contract/web3';
import instance from '../../../Solidity_Contract/VotingInstance';

class RegisterAddress extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
        registerLoading: false
    }
  }
    registerAddress = async () => {
        this.setState({
            registerLoading: true
        })

        let regResp = await instance.methods.registerMember().send({from: this.props.home.currentAccountInfo.currentAccount, gas: '1000000'});
        if(regResp.events) {
            this.props.saveCurrentAcc({currentAccount: this.props.home.currentAccountInfo.currentAccount, addressRegistered: true});
            this.props.setMembersLength(regResp.events.MemberRegistered.returnValues[0]);
        }
    }
  render() {
    return (
        <Card className="register-card" loading={!this.props.home.contractData.contractLoaded} title="Address Not Registered!">
          Your current Metamask Account Address: <b>{this.props.home.currentAccountInfo.currentAccount}</b> is not registered yet.
          <br/>
          <Button type="primary" loading={this.state.registerLoading} onClick={this.registerAddress}>Register Address</Button>
        </Card>
    );
  }
}

RegisterAddress.propTypes = {

};

export default RegisterAddress;
