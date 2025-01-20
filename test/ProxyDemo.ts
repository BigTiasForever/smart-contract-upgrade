import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import "dotenv/config";

describe("Demo Proxy", function () {
 //* Usando il `beforeEach` in questo modo, ogni volta che viene eseguito un test,
 //* verrà eseguito il codice all'interno del `beforeEach` e le variabili devono
 //* Essere trasferite in maniera abbastanza spartana
 //  beforeEach(async () => {
 //   const Demo = await ethers.getContractFactory("Demo");

 //   const instance = await upgrades.deployProxy(Demo);
 //   console.log(`Contract Instance address: ${await instance.getAddress()}`);
 //  });

 //* Utilizzando loadFixture permette di creare un ambiente pulito ad ogni esecuzione
 //* Va a semplificare anche il passaggio dei dati tra test e funzioni eseguite
 async function deployDemo() {
  const Demo = await ethers.getContractFactory("Demo");

  const demo = await upgrades.deployProxy(Demo, [], {
   kind: "uups",
   initializer: "initialize()",
  });
  await demo.waitForDeployment();

  return { demo };
 }

 async function upgradeDemo() {
  const { demo } = await deployDemo();

  const DemoV2 = await ethers.getContractFactory("DemoV2");
  const demoV2 = await upgrades.upgradeProxy(demo, DemoV2, {
   kind: "uups",
   call: "initialize()",
  });
  await demoV2.waitForDeployment();

  return { demoV2 };
 }

 async function upgradeDemoV3() {
  const { demoV2 } = await upgradeDemo();

  const DemoV3 = await ethers.getContractFactory("DemoV3");
  const demoV3 = await upgrades.upgradeProxy(demoV2, DemoV3, {
   kind: "uups",
   call: "initialize()",
  });
  await demoV3.waitForDeployment();

  return { demoV3 };
 }

 async function upgradeDemoV4() {
  const { demoV3 } = await upgradeDemoV3();

  const DemoV4 = await ethers.getContractFactory("DemoV4");
  const demoV4 = await upgrades.upgradeProxy(demoV3, DemoV4, {
   kind: "uups",
   call: "initialize()",
  });
  await demoV4.waitForDeployment();

  return { demoV4 };
 }

 describe("Proxy interaction", async function () {
  it("Should deploy the demo", async function () {
   const { demo } = await loadFixture(deployDemo);

   expect(await demo.version()).to.equal("1.0.0");

   const newValue = 1;
   await demo.setValue(newValue);
   const value = await demo.getValue();
   expect(value).to.equal(newValue);
  });

  it("Value should be 0", async () => {
   const { demo } = await loadFixture(deployDemo);

   const value = await demo.getValue();
   expect(value).to.equal(0);
  });
 });

 describe("Upgrading", async () => {
  it("Should have the same address", async () => {
   const { demo } = await loadFixture(deployDemo);
   const demoAddress = await demo.getAddress();
   let version = await demo.version();
   expect(version).to.equal("1.0.0");

   const DemoV2 = await ethers.getContractFactory("DemoV2");
   const demoV2 = await upgrades.upgradeProxy(demo, DemoV2);
   const demoV2Address = await demoV2.getAddress();
   version = await demoV2.version();
   expect(version).to.equal("2.0.0");

   expect(demoAddress).to.equal(demoV2Address);
  });

  it("Should have upgraded the proxy to DemoV2", async () => {
   const { demoV2 } = await loadFixture(upgradeDemo);

   const version = await demoV2.version();
   expect(version).to.equal("2.0.0");
  });

  it("Should get the value", async () => {
   const { demoV2 } = await loadFixture(upgradeDemo);

   const value = await demoV2.getValue();
   expect(value).to.equal(0);
  });

  it("Should set the value", async () => {
   const { demoV2 } = await loadFixture(upgradeDemo);

   const newValue = 1;
   await demoV2.setValue(newValue);
   const value = await demoV2.getValue();
   expect(value).to.equal(newValue);
  });
 });

 describe("Upgrading to V3", async () => {
  it("Should have the same address", async () => {
   const { demo } = await loadFixture(deployDemo);
   const demoAddress = await demo.getAddress();
   let version = await demo.version();
   expect(version).to.equal("1.0.0");

   const DemoV3 = await ethers.getContractFactory("DemoV3");
   const demoV3 = await upgrades.upgradeProxy(demo, DemoV3, {
    kind: "uups",
    call: "initialize()",
   });
   const demoV3Address = await demoV3.getAddress();
   version = await demoV3.getVersion();
   expect(version).to.equal("3.0.0");

   expect(demoAddress).to.equal(demoV3Address);
  });

  it("Should get the value", async () => {
   const { demoV3 } = await loadFixture(upgradeDemoV3);

   const value = await demoV3.getValue();
   expect(value).to.equal(0);
  });

  it("Should set the value", async () => {
   const { demoV3 } = await loadFixture(upgradeDemoV3);

   const newValue = 1;
   await demoV3.setValue(newValue);
   const value = await demoV3.getValue();
   expect(value).to.equal(newValue);
  });
 });
});
