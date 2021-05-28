const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox',
        '--allow-hidden-media-playback',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--use-fake-ui-for-media-stream',
        '--start-maximized',
        '--use-fake-device-for-media-stream'
      ],
        ignoreDefaultArgs: ['--enable-automation'],
        executablePath:'/usr/bin/google-chrome',
        defaultViewport: null
    });

  const page = await browser.newPage();
  page.on('load', () => console.log('Page loaded!'));
  await page.goto('https://trtc-1252463788.file.myqcloud.com/web/demo/rtc/index.html', {
    waitUntil: 'networkidle0',
    timeout: 20000,
  });

  console.log(await page.evaluate('rtc.sdkAppId_'));
  await page.click('#join');

  const setting_btn = await page.$('#settings');
  await setting_btn.click();
  // await page.click('#settings');
  console.log(await page.evaluate('rtc.sdkAppId_'));

  await page.screenshot({path: 'test.png'});
  await page.waitFor(60 * 1000);
})();
// main_handler()
