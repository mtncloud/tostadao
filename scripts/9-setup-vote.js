import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const vote = sdk.getVote("0x45E5F146754400FD9FCFbdFcC364F59e77425a41");

// This is our ERC-20 contract.
const token = sdk.getToken("0xAE7C1e163f9943DD6E3d872b8bf3c16d7727Db6c");

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent75 = Number(ownedAmount) / 100 * 75;

    // Transfer 90% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent75
    ); 

    console.log("✅ Successfully transferred " + percent75 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();