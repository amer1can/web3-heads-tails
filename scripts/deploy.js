// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const HeadsOrTailsFactory = await hre.ethers.getContractFactory("HeadsOrTails");
  const headsOrTails = await HeadsOrTailsFactory.deploy();
  console.log("now waiting");

  await headsOrTails.deployed();

  console.log("Heads Or Tails deployed to:", headsOrTails.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
