
import {expect,test} from '../../src/fixtures/pagefixtures';




test.beforeEach(async ({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogoin(process.env.USERNAME!,process.env.PASSWORD!);
})

test('home page title test',async({homePage})=>{
    const actualPageTitle = await homePage.getPageTitle();
    console.log('login page title',actualPageTitle);
    expect(actualPageTitle).toBe('My Account');
})

test(`Is Logout link present`,async({homePage})=>{
    const actualPageTitle = await homePage.isLogoutLinkExist();
    console.log('login page title',actualPageTitle);
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});


test(`Home Page HeadersIs Logout link present`,async({homePage})=>{
    const headers = await homePage.getAllHeaders();
    console.log(`all Headrs,${headers}`);
    expect(headers).toHaveLength(4);
    expect(headers).toEqual(['My Account','My Orders','My Affiliate Account','Newsletter']);
});