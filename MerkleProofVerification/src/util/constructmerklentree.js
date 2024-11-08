import { MerkleTree } from "merkletreejs";
import { ethers } from "ethers";
import { Buffer } from "buffer";

const getMerkleProofAndRoot = (transactions, targetTransaction) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    throw new Error("Transaction array is empty or invalid.");
  }

  // Convert each transaction to a keccak256 hash
  const leaves = transactions.map((tx) => {
    if (typeof tx !== "string" || tx.trim() === "") {
      throw new Error(`Invalid transaction format: ${tx}`);
    }
    return Buffer.from(ethers.utils.keccak256(Buffer.from(tx)).slice(2), "hex");
  });

  // Initialize Merkle Tree with keccak256 as the hashing function
  const tree = new MerkleTree(
    leaves,
    (data) => Buffer.from(ethers.utils.keccak256(data).slice(2), "hex"),
    { sortPairs: true }
  );

  const root = tree.getRoot().toString("hex");

  // Generate proof for the specified transaction
  const targetHash = `0x${ethers.utils
    .keccak256(Buffer.from(targetTransaction))
    .slice(2)}`;
  const proof = tree
    .getProof(targetHash)
    .map((node) => `0x${node.data.toString("hex")}`);
  return { root: `0x${root}`, proof };
};

export default getMerkleProofAndRoot;
