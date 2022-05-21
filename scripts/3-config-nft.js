import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x6934C0CA3DEC058e632F6Ddfe924A6c6A968AA4F");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Tostada(o) Membership",
        description: "For people who love flat tacos.",
        image: readFileSync("scripts/assets/tostada.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();