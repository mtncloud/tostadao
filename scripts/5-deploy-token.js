import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenAddress = await sdk.deployer.deployToken({
      // What's your token's name? Ex. "Ethereum"
      name: "Flat Taco Voting Token",
      // What's your token's symbol? Ex. "ETH"
      symbol: "TOSTADA",
      // This will be in case we want to sell our token,
      // because we don't, we set it to AddressZero again.
      primary_sale_recipient: "0xcFA18a5bbEC907486E39E3CC999d0F001c931715",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenAddress,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();