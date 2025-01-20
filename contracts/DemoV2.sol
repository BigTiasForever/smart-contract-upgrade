// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract DemoV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 private value;

    function _authorizeUpgrade(address) onlyOwner internal override {}

    function initialize() external reinitializer(2) onlyInitializing {}

    function version() public pure returns (string memory) {
        return "2.0.0";
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function setValue(uint256 _value) public {
        value = _value;
    }
}