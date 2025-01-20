const dotenv = require("dotenv");
dotenv.config();

const options = {
 method: "POST",
 headers: { accept: "application/json", "content-type": "application/json" },
 body: JSON.stringify({
  id: 1,
  jsonrpc: "2.0",
  method: "alchemy_requestGasAndPaymasterAndData",
  params: [
   {
    policyId: process.env.ALCHEMY_POLICY_ID,
    entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    dummySignature:
     "0xe8fe34b166b64d118dccf44c7198648127bf8a76a48a042862321af6058026d276ca6abb4ed4b60ea265d1e57e33840d7466de75e13f072bbd3b7e64387eebfe1b",
    userOperation: {
     sender: "0xceb161d3e0B6d01bc0e87ECC27fF9f2E2eCDCD81",
     nonce: "0x3",
     initCode: "0x",
     callData:
      "0xb61d27f600000000000000000000000043f6bfbe9dad44cf0a60570c30c307d949be4cd40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000645c833bfd000000000000000000000000613c64104b98b048b93289ed20aefd80912b3cde0000000000000000000000000000000000000000000000000de123e8a84f9901000000000000000000000000c9371ea30dea5ac745b71e191ba8cde2c4e66df500000000000000000000000000000000000000000000000000000000",
    },
   },
  ],
 }),
};

fetch(process.env.SEPOLIA_API_KEY, options)
 .then((res) => res.json())
 .then((res) => console.log(res))
 .catch((err) => console.error(err));
