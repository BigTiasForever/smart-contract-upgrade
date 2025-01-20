import { ethers, upgrades } from "hardhat";

async function main() {
 console.log("Upgrading smart contract...");
 const demoAddress = process.env.DEMO_ADDRESS;

 if (!demoAddress) {
  throw new Error("DEMO_ADDRESS is missing in .env");
 }
 try {
  const newDemo = await ethers.getContractFactory("DemoV3");
  const demo = await upgrades.upgradeProxy(demoAddress, newDemo, {
   kind: "uups",
   call: "initialize()",
  });
  await demo.waitForDeployment();

  console.log("Demo upgraded!", await demo.getAddress());
 } catch (e) {
  console.log(e);
 }
}

main();
