// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract UserProfileRegistry {
    mapping(address => string) private userCIDs;

    event ProfileUpdated(address indexed user, string cid);

    function setProfileCID(string memory cid) external {
        require(bytes(cid).length > 0, "CID cannot be empty");

        // optional: prevent re-setting same value
        if (keccak256(bytes(userCIDs[msg.sender])) == keccak256(bytes(cid))) {
            revert("CID already set to this value");
        }

        userCIDs[msg.sender] = cid;
        emit ProfileUpdated(msg.sender, cid);
    }

    function getProfileCID(address user) external view returns (string memory) {
        return userCIDs[user];
    }
}