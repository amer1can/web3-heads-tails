// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const HeadsOrTailsFactory = await hre.ethers.getContractFactory("HeadsOrTails");
  const headsOrTails = await HeadsOrTailsFactory.deploy();

  await headsOrTails.deployed();

  console.log("Heads Or Tails deployed to:", headsOrTails.address);

  let txn;
  for(let i=0; i<10; i++) {
      txn = await headsOrTails.makeBet(1);
      txn.wait();
  }
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
