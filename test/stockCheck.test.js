import { expect } from "chai";
import { DESIRED_ITEM, INSTOCK_ITEM, stockCheck } from "../src/inventory.js";

describe("Stock functionality check", () => {
  it("should return true", async () => {
    expect(await stockCheck(INSTOCK_ITEM)).to.equal(true);
  });
  it("should return false", async () => {
    expect(await stockCheck(DESIRED_ITEM)).to.equal(false);
  });
});
