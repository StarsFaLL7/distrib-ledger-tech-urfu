"use client";
import { getContract, Address } from "viem";
import { contractAbi } from "./abi";
import { ConnectWalletClient } from "./client";
import { useState } from "react";

export default function MintComponent() {
  const [contractAddress, setContractAddress] = useState("0xa634278ba15bdf9A725005030FA5EB174d2cBf7b");
  const [tokenURI, setTokenURI] = useState("https://api.cryptokitties.co/kitties/1");
  const [tokenId, setTokenId] = useState();

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
    const [account] = await walletClient.getAddresses();
    await contract.write.mintNft([tokenURI], {account: account});
    alert(`NFT mint started.`);
  }
    
    return (
      <div className="card">
        <h2>Mint NFT</h2>
        <label>
        Contract address: 
        <input
          placeholder="Smart Contract Instance"
          value={contractAddress}
          onChange={setValue(setContractAddress)}
        ></input>
        </label>
    
        <br />

        <label>
        Token URI: 
        <input
          placeholder="https://api.cryptokitties.co/kitties/1"
          value={tokenURI}
          onChange={setValue(setTokenURI)}
        ></input>
        </label>
    
        <br />

          <button
            className="px-8 py-2 rounded-md flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
            onClick={ buttonClick }>
            <h1 className="text-center">Mint</h1>
          </button>
      </div>
    );
}