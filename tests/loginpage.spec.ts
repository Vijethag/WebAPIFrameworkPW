
import {test,expect} from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';

let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach('',async({page})=>{
    loginPage = new LoginPage(page),
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);
});

test('login page title test', async ({page})=>{
    // let loginPage:LoginPage = new LoginPage(page);
    // await loginPage.goToLoginPage();
    let actualTitle = await loginPage.getLoginPageTitle();
    expect(actualTitle).toBe('Account Login');
});

test('forgot password link exists test', async ({page})=>{
    // let loginPage:LoginPage = new LoginPage(page);
    // await loginPage.goToLoginPage();
    let isExists = await loginPage.isForgottenPasswordLinkExists()
    expect(isExists).toBeTruthy();
});

test('successful login  test', async ({page})=>{
    // let loginPage:LoginPage = new LoginPage(page);
    // await loginPage.goToLoginPage();
    await loginPage.doLogoin('automationtest123@gmail.com','Automation@1234');
    // expect pending
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();;
});