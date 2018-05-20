pragma solidity ^0.4.21;


contract VotingInterface {

    function createTask(string taskName, uint256 taskEndingTime) public;

    function getTaskInfo(uint index) public view returns (address, string, uint, uint, bool, bool);

    function registerMember() public;

    function finalizeTask(uint taskId) public;

    function getTotalTasks() public view returns (uint);

    function castVote(uint taskId, bool vote) public;

    event TaskCreated(uint);
    event MemberRegistered(uint);
    event VoteCasted(address, string, uint, uint, bool, bool);
}