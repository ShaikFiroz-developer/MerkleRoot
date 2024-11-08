# Decentralized Merkle Proof Verification DApp

This project is a decentralized application (DApp) that enables users to fetch Ethereum block transactions, generate Merkle proofs, and verify if a specific transaction is part of the Merkle tree stored on the blockchain. The DApp utilizes a smart contract deployed on the Sepolia test network.

## Project Working

### Watch the Project in Action:

[![Watch the video](https://img.youtube.com/vi/XSoUGkZcu3s/0.jpg)](https://youtu.be/XSoUGkZcu3s)

> _Click the image to view the video on YouTube._

### Text Explanation

1. **Initial Screen**: The DApp opens with a UI displaying fields to enter a block number to fetch transactions.
2. **Fetching Transactions**: Enter a valid Ethereum block number, click "Get Transactions," and view the list of transactions from the specified block.
3. **Merkle Root Display**: The Merkle root for the block's transactions is generated and displayed.
4. **Verifying Transactions**: Enter a transaction hash to check its inclusion in the Merkle tree. A valid hash shows a "Verified" status, while an invalid one triggers an error.
5. **Reset Functionality**: Click "Reset" to clear all data and start a fresh verification process.

## Features

### 1. **Fetching Transactions by Block Number**

- Users can input an Ethereum block number to retrieve and view all transaction hashes associated with that block.

### 2. **Merkle Tree and Root Generation**

- After fetching transactions, a Merkle tree is constructed. The root of this tree is stored on the blockchain using a smart contract for further verification.
- **Smart Contract Interaction**: The Merkle root is recorded in the deployed contract, allowing for efficient proof and verification.

### 3. **Generating Merkle Proof for a Transaction**

- Users enter a transaction hash to generate the Merkle proof for inclusion verification.
- If the transaction is part of the Merkle tree, the proof is displayed; otherwise, a message indicates that it’s not part of the tree.

### 4. **On-Chain Verification of Transaction Inclusion**

- With a Merkle proof generated, users can verify inclusion by sending the proof to the smart contract function `verifyTransactionInclusion`.
- A successful verification displays "Valid"; otherwise, "Invalid" is shown with an appropriate message.

### 5. **Error Handling and Notifications**

- The application handles various scenarios, like invalid block numbers, incorrect transaction hashes, and connectivity issues, and displays error messages accordingly.

### 6. **Reset Functionality**

- The "Reset" button clears the input fields and resets the application's state, allowing users to start a new verification cycle.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourprojectname.git
   cd yourprojectname
   ```
2. npm install --- to install all dependencies of project.

3. Start project with command npm run dev

## Usage

1. Open your browser and navigate to http://localhost:5173.
2. Enter a block number to fetch transactions.
3. Enter a transaction hash to generate and verify the Merkle proof.

## Thing to know befor running project

1. Sepolia testnet tokens are available limited to get. Prefer a alternate like ganache which
   provides with local ethereum testnet.
2. Use Ether.js for best experience accordingly check the documentation for references.
3. Use truffle framework to compile deploy and maintain smart contract written in solidity.

## Technologies Used

1. React: For building the frontend.
2. ethers.js: To interact with the Ethereum blockchain and smart contract.
3. Smart Contract (Solidity): Deployed on Sepolia for storing Merkle roots and verifying proofs.
4. Merkle Tree: Implemented to ensure transaction inclusion in the block.

## Smart Contract Details

1. Network: Sepolia testnet
2. Functions:
   -------|setMerkleRoot: Stores the Merkle root on-chain.
   -------|verifyTransactionInclusion: Verifies a transaction’s inclusion based on the provided Merkle proof.

## Future Improvements

1. Further Gas Optimization: Reducing costs for storing Merkle roots on-chain.
2. Real-Time Transaction Updates: Automatically updating based on the latest block.
