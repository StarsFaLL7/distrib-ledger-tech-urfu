import { expect } from "chai";
import { ethers } from "hardhat";
describe("VendingMachine", function () {
    it("test payable method", async function () {
        const VendingMachine = await ethers.getContractFactory("VendingMachine");
        const vending = await VendingMachine.deploy("CUP");
        await vending.deployed();
        console.log("VendingMachine deployed at:" + vending.address);
        const [owner, acc_1] = await ethers.getSigners();
        expect(await vending.getVendingMachineBalance()).to.equal(100);
        await vending.connect(acc_1).purchase(1, {value: 1e9});
        expect(await vending.getVendingMachineBalance()).to.equal(99);
    });
    it("test refill", async function () {
        const VendingMachine = await ethers.getContractFactory("VendingMachine");
        const vending = await VendingMachine.deploy("CUP");
        await vending.deployed();
        console.log("VendingMachine deployed at:" + vending.address);
        const [owner, acc_1] = await ethers.getSigners();
        expect(await vending.getVendingMachineBalance()).to.equal(100);
        await vending.connect(acc_1).purchase(1, {value: 1e9});
        expect(await vending.getVendingMachineBalance()).to.equal(99);
        await vending.refill(1);
        expect(await vending.getVendingMachineBalance()).to.equal(100);
    });
});