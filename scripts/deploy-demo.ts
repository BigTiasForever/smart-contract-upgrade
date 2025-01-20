import { ethers, upgrades } from "hardhat";

async function main() {
 const Demo = await ethers.getContractFactory("Demo");
 const demo = await upgrades.deployProxy(Demo, {
  kind: "uups",
 });
 await demo.waitForDeployment();
 console.log(`Version: ${await demo.version()}`);

 const demoAddress = await demo.getAddress();
 console.log(`Demo deployed at ${demoAddress}`);
}

main();
