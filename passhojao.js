let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];
let pageName = process.argv[3];
let postToLike = process.argv[4];
let url, pwd, user, user2;
(async function() {
    let data = await fs.promises.readFile(credentialsFile, "utf-8");
    let credentials = JSON.parse(data);
    url = credentials.url;
    user = credentials.user;
    pwd = credentials.pwd;
    sub = credentials.sub;
    // starts browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications"],
        slowMo: 400

    });
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    // goto page
    // 1. 
    await tab.goto(url);
    await tab.waitForSelector("#user_login");
    await tab.type("#user_login", user, { delay: 200 });

    await tab.waitForSelector("#user_password");
    await tab.type("#user_password", pwd, { delay: 200 });

    await tab.waitForSelector("button[class='btn waves-effect waves-light']");
    await tab.click("button[class='btn waves-effect waves-light']");

    await tab.waitForSelector("a[href='/notes']");
    await tab.click("a[href='/notes']");

    await tab.waitForSelector("a[href='/notes/sqta-automated-testing']");
    await tab.click("a[href='/notes/sqta-automated-testing']");

    await tab.waitForSelector("div[class='card-content white-text']");
    await tab.click("div[class='card-content white-text']");

    await tab.waitForSelector("#download");
    await tab.click("#download");
    //<paper-ripple id="ink" recenters="" class='circle'></paper-ripple>
})()