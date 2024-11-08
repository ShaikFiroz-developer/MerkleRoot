// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleProofVerification {
    address public owner;
    bytes32 public merkleRoot;

    event MerkleRootStored(bytes32 root);
    event VerificationResult(bool isValid, string message);

    // Modifier to restrict access to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender; // Set the owner to the address that deploys the contract
    }

    // Set the Merkle Root (only callable by the owner)
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
        emit MerkleRootStored(merkleRoot); // Emit an event whenever the Merkle root is updated
    }

    // Verify if a transaction hash is part of the Merkle tree using a proof
    function verifyTransactionInclusion(
        bytes32 transactionHash,
        bytes32[] calldata proof
    ) external view returns (bool isValid, string memory message) {
        // Check if the Merkle root is set
        if (merkleRoot == bytes32(0)) {
            return (
                false,
                "Merkle root is not set. Cannot verify transaction inclusion."
            );
        }

        // Check if the transaction hash is valid
        if (transactionHash == bytes32(0)) {
            return (
                false,
                "Transaction hash is empty. Cannot verify inclusion."
            );
        }

        // Use OpenZeppelin's MerkleProof.verify function
        bool verified = MerkleProof.verify(proof, merkleRoot, transactionHash);

        if (verified) {
            return (true, "Transaction is included in the Merkle tree.");
        } else {
            return (false, "Transaction is NOT included in the Merkle tree.");
        }
    }
}
