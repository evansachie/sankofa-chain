// import { ethers } from "ethers";
// import Synapse from "@filoz/synapse-sdk";

// async function connectWallet() {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   await provider.send("eth_requestAccounts", []);
//   const signer = provider.getSigner();
//   const address = await signer.getAddress();

//   await signer.signMessage("Login to DApp");

//   return { provider, signer, address };
// }

// async function depositTestUSDFC(amount, signer) {
//   const synapse = await Synapse.create({ env: "testnet", signer: window.ethereum });
//   const tx = await synapse.payments.deposit({ amount }); 
//   await tx.wait();
//   console.log(`Deposited ${amount} test USDFC`);
// }

// async function approveService(signer) {
//   const synapse = await Synapse.create({ env: "testnet", signer: window.ethereum });
//   const tx = await synapse.payments.approveService("warm"); 
//   await tx.wait();
//   console.log("Approved Synapse storage service");
// }

// async function uploadProfile(profileJson) {
//   const synapse = await Synapse.create({ env: "testnet", signer: window.ethereum });

//   const { cid } = await synapse.storage.upload({
//     data: JSON.stringify(profileJson),
//     filename: "profile.json",
//     mimeType: "application/json"
//   });

//   return cid;
// }


// async function setProfileCID(ensName, cid) {
//   const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/fc204e81f10a49ababe8df1cbe517dd1");
//   const signer = new ethers.Wallet("bcebcdf1e82e680be592c3c99087bfd7fcbefac737fb96d841a45f0a86f0b204", provider);

//   const resolver = await provider.getResolver(ensName);

//   if (!resolver) throw new Error("No resolver set for ENS name");

//   const tx = await resolver.connect(signer).setText("profileCID", cid);
//   await tx.wait();

//   console.log(`Profile CID set for ${ensName}: ${cid}`);
// }

// async function getProfileCID(ensName) {
    
//   const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/fc204e81f10a49ababe8df1cbe517dd1");

//   const resolver = await provider.getResolver(ensName);
//   if (!resolver) throw new Error("No resolver found for ENS");

//   const cid = await resolver.getText("profileCID");
//   return cid;
// }

// async function getProfile(ensName) {
//   const cid = await getProfileCID(ensName);
//   const url = `https://gateway.lighthouse.storage/ipfs/${cid}`;
//   const res = await fetch(url);
//   const profile = await res.json();
//   return profile;
// }

// getProfile("samad.eth").then(console.log);


import { ethers } from "ethers";
import Synapse from "@filoz/synapse-sdk";

async function connectWallet() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  await signer.signMessage("Login to DApp");

  return { provider, signer, address };
}

async function depositTestUSDFC(amount, signer) {
  const synapse = await Synapse.create({ env: "testnet", signer});
  const tx = await synapse.payments.deposit({ amount }); 
  await tx.wait();
  console.log(`Deposited ${amount} test USDFC`);
}

async function approveService(signer) {
  const synapse = await Synapse.create({ env: "testnet", signer });
  const tx = await synapse.payments.approveService("warm"); 
  await tx.wait();
  console.log("Approved Synapse storage service");
}

async function uploadProfile(profileJson) {
  const synapse = await Synapse.create({ env: "testnet", signer });

  const { cid } = await synapse.storage.upload({
    data: JSON.stringify(profileJson),
    filename: "profile.json",
    mimeType: "application/json"
  });

  return cid;
}

async function saveCidOnChain(cid, signer) {
  const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  const abi = [
    "function setProfileCID(string cid) external",
    "function getProfileCID(address user) external view returns (string)"
  ];

  const contract = new ethers.Contract(contractAddress, abi, signer);
  const tx = await contract.setProfileCID(cid);
  await tx.wait();
  console.log("CID saved:", cid);
}

async function fetchProfile(userAddress, provider) {
  const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  const abi = ["function getProfileCID(address user) external view returns (string)"];

  const contract = new ethers.Contract(contractAddress, abi, provider);
  const cid = await contract.getProfileCID(userAddress);

  const synapse = await Synapse.create({ env: "testnet" });
  const file = await synapse.storage.download(cid);
  console.log("return format of download????? ",typeof(file),file)
  const profile = JSON.parse(await file.text());

  return profile;
}