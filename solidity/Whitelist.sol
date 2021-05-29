// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "./Ownable.sol";
import "../interfaces/IERC20.sol";

contract Whitelist is Ownable {
    mapping(address => bool) whitelist;
    IERC20 jigStack = IERC20(0x1F8A626883d7724DBd59eF51CBD4BF1Cf2016D13);
    event AddedToWhitelist(address indexed account);
    event RemovedFromWhitelist(address indexed account);
    event MinHeldTokensChanged(uint256 amount);
    uint256 public minHeldTokens = 100 ether;

    modifier onlyWhitelisted() {
        require(isWhitelisted(msg.sender), "ICO_CAMPAIGN::NOT_WHITELISTED");
        _;
    }

    function addToWhitelist(address _address) public onlyOwner {
        require(_address != address(0), "ICO_CAMPAIGN::INVALID_WALLET");
        whitelist[_address] = true;
        emit AddedToWhitelist(_address);
    }

    function addToWhitelistBatch(address[] memory _address) public onlyOwner {
        for (uint256 i = 0; i < _address.length; i++) {
            addToWhitelist(_address[i]);
        }
    }

    function removFromWhitelist(address _address) public onlyOwner {
        require(_address != address(0), "ICO_CAMPAIGN::INVALID_WALLET");
        whitelist[_address] = false;
        emit RemovedFromWhitelist(_address);
    }

    function removFromWhitelistBatch(address[] memory _address)
        public
        onlyOwner
    {
        for (uint256 i = 0; i < _address.length; i++) {
            removFromWhitelist(_address[i]);
        }
    }

    function setHeldTokens(uint256 _amount) external {
        minHeldTokens = _amount;
        emit MinHeldTokensChanged(_amount);
    }

    function isWhitelisted(address _address) public view returns (bool) {
        return
            whitelist[_address] ||
            jigStack.balanceOf(_address) >= minHeldTokens;
    }

    modifier inWhitelist(address _user) {
        require(
            whitelist[_user] == true,
            "User isn't authorized to perform this operation."
        );
        _;
    }
}