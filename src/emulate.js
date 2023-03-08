const puppeteer = require("puppeteer");


let browser = null;
let page = null;
let counter = { fails: 0, success: 0 }

async function start({ showBrowser = false } = {}) {

    const args = {
        headless: !showBrowser,
        args: ["--no-sandbox",
            // "--blink-settings=imagesEnabled=false"]
        ]
    }


    try {
        browser = await puppeteer.launch(args);
        page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36')
        // Configure the navigation timeout
        await page.goto('https://chat.zalo.me/', {
            waitUntil: 'load',
            timeout: 0
        });

        // Navigate to some website e.g Our Code World
        await page.goto('https://chat.zalo.me/');


    } catch (err) {
        throw err;
    }


}

async function sendTo(phone, message) {


    process.stdout.write("Sending Message...\r");
    await page.waitForSelector('.group-search__icon', { timeout: 0 });
    await page.click('.group-search__icon');
    await page.waitForTimeout(1000);
    await page.keyboard.type(phone, { delay: 200 });
    await page.waitForTimeout(1000);

    const number_result = await page.$('.conv-item-body__main', { timeout: 0 });
    //console.log(number_result);
    if (number_result) {
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        await page.keyboard.type(message, { delay: 200 });
        await page.waitForTimeout(1000);
        await page.keyboard.press('Enter');
        //console.log('not empty');
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`${phone} Sent\n`);
        counter.success++;

    } else {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`${phone} Failed\n`);
        counter.fails++;
    }

}
async function end() {
    await browser.close();
    console.log(`Result: ${counter.success} sent, ${counter.fails} failed`);
}
async function send(phone, message) {
    for (let phones of phone) {
        await sendTo(phones, message);
    }
}
module.exports = {
    sendTo,
    send,
    start,
    end
}