import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CsvUtil } from '../utils/CsvUtils';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { BasePage } from '../pages/BasePage';


// define types for page fixtures

type pageFixture = {
    basePage:BasePage,
    loginPage:LoginPage,
    homePage:HomePage,
    searchPage:SearchResultsPage,
    productInfoPage:ProductInfoPage,
    testData:Record<string,string>[]
}

// extend playwright base test
export let test = baseTest.extend<pageFixture>({

    basePage:async({page},use)=>{
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage:async({page},use)=>{
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },
    homePage:async({page},use)=>{
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchPage:async({page},use)=>{
        let searchPage = new SearchResultsPage(page);
        await use(searchPage);
    },

    productInfoPage:async({page},use)=>{
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },
    // Test Data Fixture Approach
    testData:async({},use)=>{
        let testData = CsvUtil.readCSV('src/data/logindata.csv');
        await use(testData);
    }
});

export {expect} from '@playwright/test';