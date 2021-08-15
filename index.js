const puppeteer = require("puppeteer");
const uuid = require("uuid").v4;

const INSTAGRAM_STORY = { width: 1080, height: 1920 };
const NUMERO_DE_POSTS = [...Array(20).keys()];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport(INSTAGRAM_STORY);
  await page.setCacheEnabled(false);
  await page.goto("http://localhost:1234/");

  console.log("Generating pictures...");

  for (const _ of NUMERO_DE_POSTS) {
    await page.reload({ waitUntil: "networkidle0" });
    await page.screenshot({
      path: `./generatedPictures/${uuid()}.jpeg`,
      fullPage: true,
      type: "jpeg",
      quality: 100,
    });
  }

  await browser.close();
})();
