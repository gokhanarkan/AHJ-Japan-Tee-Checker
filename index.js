const express = require("express");
const bodyParser = require("body-parser");
const { Telegraf } = require("telegraf");
const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");

// This is the t-shirt I'd love to get
const DESIRED_ITEM =
  "https://store.alberthammondjr.com/114429/AHJ-Japan-Tee-White-T-Shirt";

// This is a random in stock t-shirt (for test cases)
const IN_STOCK = "https://store.alberthammondjr.com/112701/Comic-Tee";

// Initialise express and telegram bot
const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Helper functions
const stockCheck = async (item) => {
  const page = await axios.get(item);
  const $ = cheerio.load(page.data);
  const button = $("button.btn-danger").text().trim().toLowerCase();
  return button === "out of stock" ? false : true;
};

/* 
  The messages are written in my native tongue, Turkish
  I am adding the quick translations just in case if anyone is curious.
*/
const successMessage = async (chatId = process.env.CHAT_ID) => {
  // @translation: T-shirt is in stock, go and get it!
  bot.telegram.sendMessage(chatId, "T-shirt stokta! Cabuk!!!");
};

const failMessage = async (chatId = process.env.CHAT_ID) => {
  // @translation: Unfortunately the t-shirt is out of stock.
  bot.telegram.sendMessage(chatId, "Maalesef stok mevcut degil.");
};

// Bot Commands
bot.hears("kimsin?", (ctx) =>
  // @translation: who are you?
  // @translation: <just a little description of what this bot is doing>
  ctx.reply(
    `Merhaba, ben ${process.env.OWNER}'in bu linkteki ${DESIRED_ITEM} t-shirt'un stoga dusup dusmedigini kontrol etmesi icin gorevlendirdigi botum. "stok?" komutu ile stok sorgulayabilirsin. Ben yine de kendim 6 saatte bir kontrol ediyorum zaten. `
  )
);

bot.hears("stok?", async (ctx) => {
  const inventory = await stockCheck(DESIRED_ITEM);
  inventory
    ? successMessage(ctx.message.chat.id)
    : failMessage(ctx.message.chat.id);
});

// Express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const inventory = await stockCheck(DESIRED_ITEM);
  res.statusCode = 200;
  res.json({
    success: true,
    inventory,
  });
});

// Cron job to check stock every 6 hours
cron.schedule("0 */6 * * *", async function () {
  const inventory = await stockCheck(DESIRED_ITEM);
  if (inventory) successMessage();
});

bot.launch();
app.listen(3000, () => console.log("server started"));
