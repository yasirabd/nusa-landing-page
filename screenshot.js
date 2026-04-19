const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 2000 });
  await page.goto('https://sma.ppdb.rushd.sch.id/register/regular', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/home/yasirabd/nusa-landing-page/rushd.png', fullPage: true });
  await browser.close();
})();
