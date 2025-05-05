"use client";
import { getContract, Address } from "viem";
import { contractAbi } from "./abi";
import { ConnectWalletClient } from "./client";
import { useState } from "react";

export default function TokenUriComponent() {
  const [checkedTokenId, setCheckedTokenId] = useState("None");
  const [checkedTokenUri, setCheckedTokenUri] = useState("None");
  const [contractAddress, setContractAddress] = useState("0xa634278ba15bdf9A725005030FA5EB174d2cBf7b");
  const [tokenId, setTokenId] = useState(1);

  const setValue = (setter:any) => (evt:any) => setter(evt.target.value);

  const walletClient = ConnectWalletClient();
  
  async function buttonClick() {
    const checkedAddress = contractAddress as Address;

    const contract = getContract({
      address: checkedAddress,
      abi: contractAbi,
      client: walletClient,
    });

    console.log("Connected to Contract: ", contract);
    
    const token_id = BigInt(tokenId);
    setCheckedTokenId(String(token_id));
    const uri = await contract.read.tokenURI([token_id]);
    setCheckedTokenUri(uri);
  }
    
    return (
      <div className="card">
        <h2>Узнать Token URI</h2>
        <label>
        Contract address: 
        <input
          placeholder="Smart Contract Instance"
          value={contractAddress}
          onChange={setValue(setContractAddress)}
        ></input>
        </label>
        <br />

        <label>Token Id: 
        <input placeholder="1" value={tokenId} onChange={setValue(setTokenId)} />
        </label>
          <button
            className="px-8 py-2 rounded-md flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
            onClick={ buttonClick }>
            <h1 className="text-center">Token Info</h1>
          </button>
          <p>Last checked URI of token with id <b>{checkedTokenId}</b> <br/><b>{checkedTokenUri}</b></p>
      </div>
    );
}