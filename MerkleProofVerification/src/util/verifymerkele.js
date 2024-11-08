//example code to verify the existance of transaction in merkle tree from frontend itself.

import { MerkleTree } from "merkletreejs";
import SHA256 from "crypto-js/sha256";
import { Buffer } from "buffer";

const generateMerkleProof = async (arr, transaction) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    console.error("Error: Transaction array is empty or invalid.");
    return null;
  }

  const leaves = arr
    .map((x) => {
      if (typeof x !== "string" || x.trim() === "") {
        console.error(`Invalid transaction format: ${x}`);
        return null;
      }
      const hash = SHA256(x).toString();
      return Buffer.from(hash, "hex");
    })
    .filter(Boolean);

  if (leaves.length === 0) {
    console.error("Error: No valid leaves available for Merkle tree.");
    return null;
  }

  try {
    const tree = new MerkleTree(
      leaves,
      (x) => Buffer.from(SHA256(x).toString(), "hex"),
      { hashLeaves: false, sortPairs: true }
    );

    // Get the hash of the transaction to verify
    const transactionHash = Buffer.from(SHA256(transaction).toString(), "hex");

    // Get the Merkle proof for the transaction
    const proof = tree
      .getProof(transactionHash)
      .map((x) => x.data.toString("hex"));

    console.log("Merkle Proof:", proof);

    return proof;
  } catch (error) {
    console.error("Error generating Merkle proof:", error.message);
    return null;
  }
};

export default generateMerkleProof;
