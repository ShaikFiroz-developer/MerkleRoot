// File: App.js
import { useState } from "react";
import fetchTransactions from "./util/fetchblockdata";
import getMerkleProofAndRoot from "./util/constructmerklentree";
import { ethers } from "ethers";
import contractabi from "./util/contractabi";
import { Buffer } from "buffer";

function App() {
  const [blockNumber, setBlockNumber] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [proofLoading, setProofLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [proofError, setProofError] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [merkleRoot, setMerkleRoot] = useState(null);
  const [transactionHash, setTransactionHash] = useState("");
  const [merkleProof, setMerkleProof] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [proofNotExist, setProofNotExist] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const contractAddress = "0xD0000149ac7dc4BC7F276A70Fe2aAF23204bD3C0";

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractabi, signer);
  };

  const handleFetchTransactions = async () => {
    setLoading(true);
    setFetchError("");
    setTransactions([]);
    setMerkleRoot(null);
    setMerkleProof([]);
    setIsVerified(false);
    setVerificationMessage("");
    setProofNotExist(false);

    try {
      const result = await fetchTransactions(blockNumber);
      const transactionHashes = result.map((tx) => tx);
      setTransactions(transactionHashes);

      const { root } = getMerkleProofAndRoot(transactionHashes, "");
      setMerkleRoot(root);

      const contract = await getContract();
      const tx = await contract.setMerkleRoot(root);
      await tx.wait();
    } catch (error) {
      setFetchError("Failed to fetch transactions. Please try again.");
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMerkleProof = async () => {
    if (!transactionHash || !merkleRoot) {
      setProofError("Please provide a valid transaction hash and Merkle root.");
      return;
    }

    setProofLoading(true);
    setProofError("");
    setVerificationMessage("");

    try {
      const { proof } = getMerkleProofAndRoot(transactions, transactionHash);
      setMerkleProof(proof);

      if (proof.length > 0) {
        await verifyMerkleProofOnContract(proof);
      } else {
        setIsVerified(false);
        setProofNotExist(true);
        setVerificationMessage(
          "The provided transaction hash is not part of the Merkle tree."
        );
      }
    } catch (error) {
      setProofError("Failed to generate Merkle proof. Please try again.");
      console.error(error);
    } finally {
      setProofLoading(false);
    }
  };

  const verifyMerkleProofOnContract = async (proof) => {
    setVerifying(true);
    try {
      const contract = await getContract();
      const transactionHashs = `0x${ethers.utils
        .keccak256(Buffer.from(transactionHash))
        .slice(2)}`;

      if (proof.length > 0) {
        const isValid = await contract.verifyTransactionInclusion(
          transactionHashs,
          proof
        );
        setVerificationMessage(isValid[1] || "Verification complete.");
        setIsVerified(isValid[0]);
      } else {
        setVerificationMessage("Invalid transaction hash.");
        setIsVerified(false);
        setProofNotExist(true);
      }
    } catch (error) {
      setProofError("Failed to verify Merkle proof on contract.");
      console.error(error);
    } finally {
      setVerifying(false);
    }
  };

  const handleReset = () => {
    setLoading(false);
    setFetchError("");
    setTransactions([]);
    setMerkleRoot(null);
    setMerkleProof([]);
    setIsVerified(false);
    setVerificationMessage("");
    setProofError("");
    setBlockNumber("");
    setTransactionHash("");
    setProofNotExist(false);
  };

  return (
    <div className="flex w-[100vw] flex-col min-h-screen bg-gray-100 p-6">
      <div className="w-full h-12 flex justify-center items-center">
        <button
          onClick={handleReset}
          className="text-black bg-orange-600 hover:bg-orange-700 font-medium italic rounded p-1"
        >
          Reset all
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-orange-700 text-center mb-4">
              Block Transactions
            </h1>
            <input
              type="text"
              value={blockNumber}
              onChange={(e) => setBlockNumber(e.target.value)}
              placeholder="Enter block number"
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-orange-600"
            />
            <button
              onClick={handleFetchTransactions}
              disabled={!blockNumber || loading}
              className="w-full bg-orange-600 text-black font-bold p-3 rounded-lg hover:bg-orange-700 transition disabled:bg-orange-400"
            >
              {loading ? "Loading..." : "Get Transactions"}
            </button>
            {fetchError && (
              <p className="text-red-600 text-center mt-4">{fetchError}</p>
            )}
            {transactions.length > 0 && (
              <ul className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                {transactions.map((hash, index) => (
                  <li
                    key={index}
                    className="p-2 border border-gray-200 text-black rounded-lg text-xs bg-gray-50 break-all"
                  >
                    {hash}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {merkleRoot && (
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-orange-700 text-center mb-2">
                Merkle Root
              </h2>
              <p className="text-center text-gray-700 break-all">
                {merkleRoot}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-orange-700 text-center mb-2">
              Generate Merkle Proof
            </h2>
            <input
              type="text"
              value={transactionHash}
              onChange={(e) => {
                setTransactionHash(e.target.value);
                setIsVerified(false);
                setMerkleProof([]);
                setVerificationMessage("");
                setProofNotExist(false);
              }}
              placeholder="Enter transaction hash"
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-orange-600"
            />
            <button
              onClick={handleGenerateMerkleProof}
              disabled={!transactionHash || proofLoading}
              className="w-full bg-orange-600 text-white font-bold p-3 rounded-lg hover:bg-orange-700 transition disabled:bg-orange-400"
            >
              {proofLoading ? "Generating..." : "Generate Proof"}
            </button>
            {proofError && (
              <p className="text-red-600 text-center mt-4">{proofError}</p>
            )}
            {merkleProof.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 text-black rounded-lg">
                <h3 className="font-semibold text-gray-700">Merkle Proof:</h3>
                <ul className="text-xs break-all">
                  {merkleProof.map((proofItem, index) => (
                    <li key={index}>{proofItem}</li>
                  ))}
                </ul>
                <p className="text-center mt-4">
                  Verification Status:{" "}
                  {verifying ? (
                    <span className="text-gray-500">Verifying...</span>
                  ) : (
                    <span
                      className={isVerified ? "text-green-500" : "text-red-500"}
                    >
                      {isVerified ? "Valid" : "Invalid"}
                    </span>
                  )}
                </p>
                {verificationMessage !== "" && (
                  <p className="text-center mt-2 text-gray-700">
                    {verificationMessage}
                  </p>
                )}
              </div>
            )}
            {proofNotExist && (
              <div className="mt-4 p-4 bg-yellow-100 text-yellow-900 rounded-lg">
                <span className="flex gap-2">
                  <p className="font-bold">Verification Status:</p>
                  <p className="text-red-500 font-semibold">Invalid</p>
                </span>
                <p className="mt-2">
                  <span className="font-semibold">Transaction Hash:</span>
                  <p>{transactionHash}</p>
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Merkle Root:</span>{" "}
                  <p>{merkleRoot}</p>
                </p>
                <p className="mt-4 text-red-600">
                  The provided transaction hash is not part of the Merkle tree,
                  and therefore could not be verified.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
