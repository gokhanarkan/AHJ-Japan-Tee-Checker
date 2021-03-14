import axios from "axios";
import cheerio from "cheerio";

// This is the t-shirt I'd love to get
export const DESIRED_ITEM =
  "https://store.alberthammondjr.com/114429/AHJ-Japan-Tee-White-T-Shirt";

// This is a random in stock t-shirt (for test cases)
export const INSTOCK_ITEM = "https://store.alberthammondjr.com/112701/Comic-Tee";

// Helper functions
export const stockCheck = async (item) => {
  const page = await axios.get(item);
  const $ = cheerio.load(page.data);
  const button = $("button.btn-danger").text().trim().toLowerCase();
  return button === "out of stock" ? false : true;
};