
import {test,expect} from '../src/fixtures/pagefixtures';
import { ExcelUtil } from '../src/utils/ExcelUtil';
import { JsonUtil } from '../src/utils/JsonUtil';
import { CsvUtil } from '../src/utils/CsvUtils';

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
let testData = CsvUtil.readCSV('data/logindata.csv');
// Excel File is not in local to work 
// XLSX format
// maintance - excel will be corrupted
// MS Excel - office latest
for(let data of testData){
test(`No Fixture Invalid login test with data driven n ${data.username} `, async ({loginPage})=>{
   
         await loginPage.doLogoin(data.username,data.password);
         await loginPage.isInvaliLoginDisplayed();
    // expect pending
        //  expect(await loginPage.isInvaliLoginDisplayed()).toBeTruthy();
    });
}


//DO_2:without fixtures,parallel mode,read csv data directly and loop the test method
let testDataJson = JsonUtil.readJson('data/login.json');
// Excel File is not in local to work 
// XLSX format
// maintance - excel will be corrupted
// MS Excel - office latest
for(let data of testDataJson){
test(`No Fixture Invalid login test with data driven n ${data.username} `, async ({loginPage})=>{
   
         await loginPage.doLogoin(data.username,data.password);
         await loginPage.isInvaliLoginDisplayed();
    // expect pending
        //  expect(await loginPage.isInvaliLoginDisplayed()).toBeTruthy();
    });
}


//DO_2:without fixtures,parallel mode,read csv data directly and loop the test method
let testDataXlsx = ExcelUtil.readExcel('data/logindata.csv','login');
// Excel File is not in local to work 
// XLSX format
// maintance - excel will be corrupted
// MS Excel - office latest
for(let data of testDataXlsx){
test.skip(`No Fixture Invalid login test with data driven n ${data.username} `, async ({loginPage})=>{
   
         await loginPage.doLogoin(data.username,data.password);
         await loginPage.isInvaliLoginDisplayed();
    // expect pending
        //  expect(await loginPage.isInvaliLoginDisplayed()).toBeTruthy();
    });
}

// csv vs xl vs JSON
// JSON will be lengthy
// CSV is flat file and light weight