const hre = require('hardhat');

async function main() {
const contractFactory = await hre.ethers.getContractFactory('chai');
const contract = await contractFactory.deploy();

console.log(`Address of contract ${await contract.getAddress()}`)
// npx hardhat run --network sepolia scripts/finalDeploy.js
// Address of contract 0xa2b05Ece5168aF2cDE09Ad3970d11Ce94321673e
}

main()
.catch((err) => {
    console.log(err)
    process.exitCode = 1;
})