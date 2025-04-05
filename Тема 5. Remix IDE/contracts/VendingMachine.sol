// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title VendingMachine
 */
contract VendingMachine {

    address public owner;

    string private _symbol;
    
    mapping (address => uint) public itemBalances; 

    constructor(string memory symbol_) {
        owner = msg.sender;
        _symbol = symbol_;
        itemBalances[address(this)] = 100;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function balanceOf(address account) public view virtual returns (uint256) {
        return itemBalances[account];
    }

    function getVendingMachineBalance() public view virtual returns (uint) {
        return itemBalances[address(this)];
    }

    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill");
        itemBalances[address(this)] += amount;
    }

    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1e9, "You must pay at least 1 gwei per item");
        require(itemBalances[address(this)] >= amount, "Not enough items in stock to complete this purchase");
        itemBalances[address(this)] -= amount;
        itemBalances[msg.sender] += amount;
    }
}