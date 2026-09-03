import {expect,test} from '../src/fixtures/pagefixtures';
import { CsvUtil } from '../src/utils/CsvUtils';




test.beforeEach(async ({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogoin(process.env.USERNAME!,process.env.PASSWORD!);
})

//DO_2:without fixtures,parallel mode,read csv data directly and loop the test method
let productData = CsvUtil.readCSV('data/product.csv');

for(let data of productData){

    test(`verify search with product - ${data.searchKey} - ${data.productName}`,async({homePage,searchPage,page})=>{
        await homePage.performSearch(data.searchKey);
        await page.waitForTimeout(5000);
        expect(await searchPage.getProductResultsCount()).toBe(Number(data.resultCount));
    
    })
}


for(let data of productData){

   
test.skip(`verify proct results - ${data.productName}`,async({homePage,searchPage,page})=>{
    await homePage.performSearch(data.searchKey);
    await searchPage.selectProduct(data.productName);
    expect(await page.title()).toBe(data.productName);

})
}

