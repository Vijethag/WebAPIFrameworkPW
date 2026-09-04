
import {test,expect} from '../../src/fixtures/pagefixtures';
import { ExcelUtil } from '../../src/utils/ExcelUtil';
import { JsonUtil } from '../../src/utils/JsonUtil';
import { CsvUtil } from '../../src/utils/CsvUtils';

test.beforeEach('',async({loginPage})=>{

    await loginPage.goToLoginPage();
});

test('login page title test', async ({loginPage})=>{
    let actualTitle = await loginPage.getLoginPageTitle();
    expect(actualTitle).toBe('Account Login');
});

test('forgot password link exists test', async ({loginPage})=>{
    let isExists = await loginPage.isForgottenPasswordLinkExists()
    expect(isExists).toBeTruthy();
});

test('successful login  test', async ({loginPage,homePage})=>{
    await loginPage.doLogoin(process.env.USERNAME!,process.env.PASSWORD!);
    // expect pending
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();;
});
// with the fixture 1 test is running with test data one by one sequentially
test('Invalid login test with data driven', async ({loginPage,testData})=>{
    for(let data of testData){
         await loginPage.doLogoin(data.username,data.password);
    // expect pending
        //  expect(await loginPage.isInvaliLoginDisplayed()).toBeTruthy();
        await loginPage.isInvaliLoginDisplayed();
    }
});

//DO_2:without fixtures,parallel mode,read csv data directly and loop the test method
let testData = CsvUtil.readCSV('src/data/logindata.csv');
for(let data of testData){
test(`CSV Invalid login test with data driven ${data.username}`, async ({loginPage})=>{
   
         await loginPage.doLogoin(data.username,data.password);
         await loginPage.isInvaliLoginDisplayed();
    // expect pending
        //  expect(await loginPage.isInvaliLoginDisplayed()).toBeTruthy();
    });
}


//DO_2:without fixtures,parallel mode,read csv data directly and loop the test method
let testDataJson = JsonUtil.readJson('src/data/login.json');
for(let data of testDataJson){
test(`JSON Invalid login test with data driven ${data.username}`, async ({loginPage})=>{
   
         await loginPage.doLogoin(data.username,data.password);
         await loginPage.isInvaliLoginDisplayed();
    // expect pending
        //  expect(await loginPage.isInvaliLoginDisplayed()).toBeTruthy();
    });
}


//DO_2:without fixtures,parallel mode,read csv data directly and loop the test method
let testDataXlsx = ExcelUtil.readExcel('src/data/logindata.xlsx','login');
for(let data of testDataXlsx){
test(`Excel Invalid login test with data driven ${data.username}`, async ({loginPage})=>{
   
         await loginPage.doLogoin(data.username,data.password);
         await loginPage.isInvaliLoginDisplayed();
    // expect pending
        //  expect(await loginPage.isInvaliLoginDisplayed()).toBeTruthy();
    });
}

// csv vs xl vs JSON
// JSON will be lengthy
// CSV is flat file and light weight