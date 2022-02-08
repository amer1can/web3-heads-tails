// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import 'hardhat/console.sol';

contract HeadsOrTails {

    uint256 private difficult;

    address internal deployer;

    modifier onlyDeployer() {
        require(msg.sender == deployer, "Only deployer!");
        _;
    }

    constructor () payable {
        deployer = msg.sender;
        difficult = (block.timestamp + block.difficulty) % 100;
    }

    function makeBet(uint8 _isOrel) public returns (bool result) {
        difficult = (block.timestamp + block.difficulty + difficult) % 100;
        console.log('The number is: ', difficult);
        require(_isOrel == 1 || _isOrel == 2, "Wrong number! Enter: 1 - Heads, 2 - Tails");

        if((_isOrel == 1 && difficult % 2 != 0) || (_isOrel == 2 && difficult % 2 == 0 )) {
            console.log('%s winner!', msg.sender);
            result = true;
            return result;
        } else {
            console.log('Sorry, you lose...');
            result = false;
            return result;
        }
    }

}
