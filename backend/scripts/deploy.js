const hre = require("hardhat");

async function main() {
  const twitter = await hre.ethers.getContractFactory("Twitter");
  const contract = await twitter.deploy();

  await contract.deployed();

  console.log(
    `Contract deployed to ${contract.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
