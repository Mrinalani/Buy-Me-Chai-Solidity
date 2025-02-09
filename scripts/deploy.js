const hre = require("hardhat");

async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balance);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (let address of addresses) {
    console.log(`Address ${counter} balance: ${await getBalance(address)} `);
    counter++;
  }
}

async function consoleMemos(memos) {
  for (let memo of memos) {
    const name = memo.name;
    const message = memo.message;
    const from = memo.from;
    const timestamp = memo.timestamp;
    console.log(
      `At ${timestamp}, name: ${name} message: ${message} from: ${from}`
    );
  }
}

async function main() {
  // console.log(await getBalance("0x849c8084Ae0BCC275DCC515375b53320CF17Ff0e"));
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("chai");
  const contract = await contractFactory.deploy();
  // await contract.deployed()

  console.log(`Contract Address is: ${await contract.getAddress()}`);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before buying chai");
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.parseEther("1") };
  await contract.connect(from1).buyChai("Karan", "no ethers!", amount);
  await contract.connect(from2).buyChai("Arjun", "Shut up!", amount);
  await contract.connect(from3).buyChai("Aman", "psycho!", amount);

  console.log("After buying chai");
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  await consoleMemos(memos);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
