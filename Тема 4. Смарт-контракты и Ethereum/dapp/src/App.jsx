import { ethers } from "ethers";
import './App.css'
import BalanceReader from "./BalanceReader";
import BlockExplorer from "./BlockExplorer";
import VendingMachine from "./VendingMachine";
import TestUSDT from "./testUSDT";

const providerUrl = 'https://ethereum-sepolia.rpc.subquery.network/public';
const provider = new ethers.JsonRpcProvider(providerUrl);
const network = await provider.getNetwork();

function App() {
  console.log(network);
  return (
    <>
    <BalanceReader
        provider={provider}
      />
      <BlockExplorer 
        provider={provider}
      />
      <VendingMachine provider={provider} />
      <TestUSDT provider={provider} />
    </>
    )
}

export default App