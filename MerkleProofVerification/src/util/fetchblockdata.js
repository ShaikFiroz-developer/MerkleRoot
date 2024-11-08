import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/9e7e45f8e337471883d3194e5fcf449e"
);

async function fetchTransactions(blockNumber) {
  try {
    // Convert block number to an integer and validate
    const parsedBlockNumber = parseInt(blockNumber, 10);
    if (isNaN(parsedBlockNumber) || parsedBlockNumber < 0) {
      throw new Error("Invalid block number provided.");
    }

    // Fetch the block with transactions
    const block = await provider.getBlockWithTransactions(parsedBlockNumber);
    if (!block || !block.transactions.length) {
      throw new Error("No transactions found in the specified block.");
    }

    // Extract transaction hashes
    const transactionHashes = block.transactions.map((tx) => tx.hash);
    return transactionHashes;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export default fetchTransactions;
