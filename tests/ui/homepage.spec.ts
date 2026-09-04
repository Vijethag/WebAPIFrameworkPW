
import {expect,test} from '@playwright/test';
import { LoginPage } from "../../src/pages/LoginPage";
import { HomePage } from "../../src/pages/HomePage";

let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogoin('automationtest123@gmail.com','Automation@1234');
    homePage = new HomePage(page);
})

test('home page title test',async()=>{
    const actualPageTitle = await homePage.getPageTitle();
    console.log('login page title',actualPageTitle);
    expect(actualPageTitle).toBe('My Account');
})

test(`Is Logout link present`,async()=>{
    const actualPageTitle = await homePage.isLogoutLinkExist();
    console.log('login page title',actualPageTitle);
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});


test(`Home Page HeadersIs Logout link present`,async()=>{
    const headers = await homePage.getAllHeaders();
    console.log(`all Headrs,${headers}`);
    expect(headers).toHaveLength(4);
    expect(headers).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);
});