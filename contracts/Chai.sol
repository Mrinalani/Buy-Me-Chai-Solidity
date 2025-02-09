// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract chai{
    struct Memo{
        string name;
        string message;
        address from;
        uint timestamp;
    }
    Memo[] memos;

    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    function buyChai(string memory _name, string memory _message) public payable {
      require(msg.value > 0, "Please pay more than 0");

       owner.transfer(msg.value);
       memos.push(Memo(_name, _message, msg.sender, block.timestamp));
    }

    function getMemos()public view returns (Memo[] memory) {
        return memos;
    }
}