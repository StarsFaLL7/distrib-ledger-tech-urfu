import { useState, useEffect } from "react";
import { ethers } from "ethers";

const tUSDTContractAddress = "0xef3Fdad7e0Aab0a26fD0284178B8d6B58C537Daf";
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"bool","name":"_status","type":"bool"}],"name":"blacklistAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"blacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"requestRecords","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"requestUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
function TestUSDT({ provider }) {
    const [writableContract, setWritableContract] = useState();
    const [readonlyContract, setReadonlyContract] = useState();
    const [address, setAddress] = useState("");
    const [symbol, setSymbol] = useState("");
    const [cupsInMachine, setTotalUSDT] = useState(0);
    const [decimals, setDecimals] = useState(0);
    const [requestUSDTCount, setMintUSDTValue] = useState("");
    const [transferUSDTCount, setTranferUSDTValue] = useState("");
    const [transferUSDTAddress, setTranferUSDTAddress] = useState("");
    const [accountBalance, setAccountBalance] = useState(0);
    const [anotherAccountBalance, setAnotherAccountBalance] = useState(0);
    const [anotherAccountAddress, setAnotherAccountAddress] = useState("");
    useEffect(() => {
        if (!symbol) { updateViewState() }
        if (writableContract) { updateUSDTBalance() }
    }, [symbol, writableContract] );

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function updateViewState() {
        const readOnlyContract = new ethers.Contract(tUSDTContractAddress, abi, provider);
        console.log(readOnlyContract);
        setReadonlyContract(readOnlyContract);
        const symbol = await readOnlyContract.symbol();
        setSymbol(symbol);

        const decimals = await readOnlyContract.decimals();
        setDecimals(decimals);

        const totalSupplyWei = await readOnlyContract.totalSupply();
        const totalSupply = (Number)(ethers.formatUnits(totalSupplyWei, decimals)).toFixed(2);
        setTotalUSDT(totalSupply.toString());
        console.log(`Total suuply: ${totalSupply} ${symbol} (${decimals} decimals)`);
    }

    async function connectWallet(evt){
        evt.preventDefault();
        try {
            const walletProvider = new ethers.BrowserProvider(window.ethereum);
            console.log(walletProvider);
            const signer = await walletProvider.getSigner();
            console.log("Wallet signer: ", signer);
            const address = signer.address;
            setAddress(address)
            console.log("Connected wallet address: ", address);
            const writableContract = new ethers.Contract(tUSDTContractAddress, abi, signer);
            setWritableContract(writableContract)
            console.log("Writable contract: ", writableContract);
        } catch (exeption){
            alert(exeption);
        }
    }
    
    async function updateUSDTBalance(){
        try {
            const balanceWei = await writableContract.balanceOf(address);
            const balance = (Number)(ethers.formatUnits(balanceWei, decimals)).toFixed(2);
            setAccountBalance(balance.toString());
            console.log(balance);
        } catch (exeption){
            alert(exeption);
        }
    }
    
    async function MinttUSDT(evt) {
        evt.preventDefault();
        try {
            console.log(writableContract);
            const tx = await writableContract.requestUSDT(address, ethers.parseUnits(requestUSDTCount, decimals));
            await tx.wait();
            updateUSDTBalance();
            updateViewState();
        } catch (exeption) {
            alert(exeption);
        }
    }

    async function TransferUSDT(evt) {
        evt.preventDefault();
        try {
            const tx = await writableContract.transfer(transferUSDTAddress, ethers.parseUnits(transferUSDTCount, decimals));
            await tx.wait();
            updateUSDTBalance();
            updateViewState();
        } catch (exeption) {
            alert(exeption);
        }
    }
    
    async function UpdateBalanceOfAnotherAddress(evt) {
        evt.preventDefault();
        try {
            const balanceWei = await readonlyContract.balanceOf(anotherAccountAddress);
            const balance = (Number)(ethers.formatUnits(balanceWei, decimals)).toFixed(2);
            setAnotherAccountBalance(balance.toString());
        } catch (exeption) {
            alert(exeption);
        }
    }

    return (
        <>
        <div className="container">
            <h2>test USDT</h2>
            <div style={{"margin-bottom": "10px"}}>Contract address: {tUSDTContractAddress} </div>
            <div className="balance" style={{"margin-bottom": "10px"}}>Total supply: <b>{cupsInMachine} {symbol}</b> </div>
            <div className="balance">Your balance: <b>{accountBalance} {symbol}</b></div>
            <input type="submit" className="button" value="Connect Wallet" onClick={ connectWallet }/>
            <form>
                <h4>Mint tUSDT</h4>
                <label>
                    <input style={{width: "200px"}} placeholder="1, 2, 3..." value={requestUSDTCount} onChange={ setValue(setMintUSDTValue) } />
                </label>
                <input type="submit" className="button" value="Mint!" onClick={MinttUSDT} disabled={ !writableContract } />
            </form>
            <form>
                <h4>Send tUSDT</h4>
                <label>Count
                    <input style={{width: "200px"}} placeholder="1, 2, 3..." value={transferUSDTCount} onChange={ setValue(setTranferUSDTValue) } />
                </label>
                <label>Address
                    <input style={{width: "350px"}} placeholder="0x8294340B7c7a35425fb3aa9E82c3F6fF6d45bc1A" value={transferUSDTAddress} onChange={ setValue(setTranferUSDTAddress) } />
                </label>
                <input type="submit" className="button" value="Send" onClick={TransferUSDT} disabled={ !writableContract } />
            </form>
            <form>
                <h4>Check another address balance</h4>
                <div className="balance">Balance of {anotherAccountAddress}: <b>{anotherAccountBalance} {symbol}</b> </div>
                <label>Address
                    <input style={{width: "350px"}} placeholder="0x8294340B7c7a35425fb3aa9E82c3F6fF6d45bc1A" value={anotherAccountAddress} onChange={ setValue(setAnotherAccountAddress) } />
                </label>
                <input type="submit" className="button" value="Check" onClick={UpdateBalanceOfAnotherAddress} />
            </form>
        </div>
        </>
    );
}

export default TestUSDT;