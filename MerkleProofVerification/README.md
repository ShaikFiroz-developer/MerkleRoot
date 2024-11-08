# Decentralized Merkle Proof Verification DApp (Solidity + React js and other tools and services) 

This project is a decentralized application (DApp) that enables users to fetch Ethereum block transactions, generate Merkle proofs, and verify if a specific transaction is part of the Merkle tree stored on the blockchain. The DApp utilizes a smart contract deployed on the Sepolia test network.

## Project Working

### Watch the Project in Action:

[![Watch the video](https://img.youtube.com/vi/XSoUGkZcu3s/0.jpg)](https://youtu.be/XSoUGkZcu3s)

> _Click the image and watch the project working video on YouTube._

## Features

### 1. **Fetching Transactions by Block Number**
-------------------------------------------------
- Users can input an Ethereum block number to retrieve and view all transaction hashes associated with that block.

### 2. **Merkle Tree and Root Generation**
-----------------------------------------
- After fetching transactions, a Merkle tree is constructed. The root of this tree is stored on the blockchain using a smart contract for further verification.
- **Smart Contract Interaction**: The Merkle root is recorded in the deployed contract, allowing for efficient proof and verification.

### 3. **Generating Merkle Proof for a Transaction**
----------------------------------------------------
- Users enter a transaction hash to generate the Merkle proof for inclusion verification.
- If the transaction is part of the Merkle tree, the proof is displayed; otherwise, a message indicates that it’s not part of the tree.

### 4. **On-Chain Verification of Transaction Inclusion**
----------------------------------------------------------
- With a Merkle proof generated, users can verify inclusion by sending the proof to the smart contract function `verifyTransactionInclusion`.
- A successful verification displays "Valid"; otherwise, "Invalid" is shown with an appropriate message.

### 5. **Error Handling**
-------------------------
- The application handles various scenarios, like invalid block numbers, incorrect transaction hashes, and connectivity issues, and displays error messages accordingly.

### 6. **Reset Functionality**
------------------------------
- The "Reset" button clears the input fields and resets the application's state, allowing users to start a new verification cycle.

## Installation
---------------
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourprojectname.git
   cd yourprojectname
   ```
2. npm install --- to install all dependencies of project.

3. Start project with command npm run dev

## Usage
--------

1. Open your browser and navigate to http://localhost:5173.
2. Enter a block number to fetch transactions.
3. Enter a transaction hash to generate and verify the Merkle proof.

## Thing to know befor running project
--------------------------------------

1. Sepolia testnet tokens are available limited to get. Prefer a alternate like ganache which
   provides with local ethereum testnet.
2. Use Ether.js for best experience accordingly check the documentation for references.
3. Use truffle framework to compile deploy and maintain smart contract written in solidity.

## Technologies Used
--------------------

1. React: For building the frontend. it inclues(html ,css , tailwind, Javascript).
2. ethers.js: To interact with the Ethereum blockchain and smart contract.
3. Smart Contract (Solidity): Deployed on Sepolia for storing Merkle roots and verifying proofs.
4. Merkle Tree: Implemented to ensure transaction inclusion in the block.
5. Amazon Web Services :- Ec2 instance was used to create and host the ganache so that we can utilize and leverage the ganache ethereum environment for our project.
6. truffle :- A framework  which provides compilation and deployment of the smart contracts written in solidity.

## Smart Contract Details

1. Network: Sepolia testnet || ethereum mainnet( I prefered ethereum mainnet because the testnet blocks having no transactions at all. In our project we worked 
   with ethereum mainnet to call the block and transaction data which is utilized for building the merkle tree.)
2. Functions:
   -------|setMerkleRoot: Stores the Merkle root on-chain.
   -------|verifyTransactionInclusion: Verifies a transaction’s inclusion based on the provided Merkle proof.

## Future Improvements

1. Further Gas Optimization: Reducing costs for storing Merkle roots on-chain.
2. Real-Time Transaction Updates: Automatically updating based on the latest block.




------------------------------------------- # NETWORK AND APPLICATION RUNNING DETAILS : ---------------------------------------------

1. I have hosted the ganache on ec2 instance of the aws. it now acts as the ethereum testnet for our project. According to our project the contract owner should be able call the setRoot function of our deployed smart contract. So I have to provide you with the wallets needed to access the network i hosted.
  Available Accounts
==================
(1) 0xb12bA0798667bE2666DfA7d0639c4879C766C3A0 (1000 ETH)
(2) 0x8A7223D1b468f96853D0f6186EE06fC4B3b54479 (1000 ETH)
(3) 0xfbE9d8ecC94E6fF72326E4af0Dac6AC25C7fD2AD (1000 ETH)
(4) 0x7948a867F910C33e05A4277Dd6ED36bD1d18c54F (1000 ETH)
(5) 0x5033fF49b3CAC430AE39023B9A0041Ce5bDc6A4c (1000 ETH)
(6) 0x3F568ABC9f7CE98F38310b0a37C6259538b7eB99 (1000 ETH)
(7) 0x9D67999e83a268bcEF852630CcbB80d494aE906b (1000 ETH)
(8) 0x33e56693DA5f982355D1e4DBbec12fCb42cCEaFe (1000 ETH)
(9) 0xaab4A412cea89a69411AcD63041A6aCf5bfde7FD (1000 ETH)

Private Keys
==================
(1) 0xaddb6331ce0cf2ca4873ab7f8ea19eb057227c45d6c9a7e605432bff0f71ecdf
(2) 0x0162f8b04961951059be62e7485b9de13dba9501f294c1367137c0f215678533
(3) 0xf87e9ba5946e31d212238a37f243b5c0c4761c9ee8d1ba5dd2bd7adfad7f991d
(4) 0xe167a8616c5f4b40dd982978ea77a7db24ef14dfb4d36e1dc4c2b6a6bfa3f83f
(5) 0x5defea0af5d444249a51f13dc39cad6bbfbc53bb83caabcf72c9102e49e56d1b
(6) 0x096525f2917b520893004ff0114afe1cd712191bf68c0b5e9519320dcba0dee7
(7) 0xf2903d888594d34b5b2d77cb46e1088976f3de06d917d8d5005c33f5037f3ddd
(8) 0x327391b4248274f20afece51548c0823d860a6f1128c83ccf04e90a06c1d7639
(9) 0x7fdd04342dba4afd1b0c79b09ee48e92b5b79c93f7353d129dc73e697d689260

Each account is associated with 1000test eth which can used to widely test the application as needed. So first need to deploy the contract for that utilize 
this 9 accounts utilizing this account can easily test and debug the application. 

#Note ---  when deploying contract with above account we must mention in the deplotmentfile of the migration folder so that it gets to know to take gas for
           the traction from which account.
          
           /*
           module.exports = async function (deployer, _, accounts) {
              await deployer.deploy(contractname, { from: accounts[1] });
             }; // undescore is network it is optional to mention
           */


2. To connect to the testet mentioned above here are the steps:--
step 1:--Open your metamask
![{E0AB4BC3-A3F9-45AE-921A-9773C946D468}](https://github.com/user-attachments/assets/a76a91f2-3df9-4fa2-941d-30c9508d4caf)

click on the left side icon mostly a ethereum icon. the click on # Add a custom Network also select the option that says also show test networks.
Now after clicking Add a custom Network button fill the exact details as show in below image to connect to Remote network that I have hosted.
![{5380C3F4-6805-441C-AA8A-23598D0F9F06}](https://github.com/user-attachments/assets/10135a80-58bd-44b6-9808-f6e3ee88251d)
just ignore the block explorer url and save the network.

3. Connect to this network just by selecting the network name we gave by clicking on left side top as shown in 2 step image.
4. Use the private keys given above to derive the accounts available and try to deploy and run the application.
5. To derive the account just click on Add account or hardware wallet.
![{84059154-7119-4F0F-8A1B-7AA273EAAE08}](https://github.com/user-attachments/assets/58ce193d-606d-4f5a-8ccc-da0e6bb0b549)
6.import the account you wish to using the any of the above privates keys.
7. Simply connect your metamask to the application and explore the block transactions with block number and derive the merkletree and as owner store it
   on the blockchain by mining a block and connect to smartcontract to check wethere the transaction given is a part of the merkletree root stored on the 
   blockchain





