import {expect,test} from '../../src/fixtures/pagefixtures';

test.beforeEach(async ({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogoin(process.env.USERNAME!,process.env.PASSWORD!);
})


    test(`@regression verify product images data`,async({homePage,searchPage,productInfoPage,page})=>{
        await homePage.performSearch('macbook');
        await page.waitForTimeout(5000);
        await searchPage.selectProduct('MacBook Pro');
        let imgCount = await productInfoPage.getProductImagesCount();
        expect(imgCount).toBe(4);
    
    })

    // Usinh Data Dtrivem pimpleemt
    test(`@regression verify product Information/Data`,async({homePage,searchPage,productInfoPage,page})=>{
        await homePage.performSearch('macbook');
        await page.waitForTimeout(5000);
        await searchPage.selectProduct('MacBook Pro');
        let actualProductInfoMap = await productInfoPage.getProductInfo();
        console.log(`actualProductInfo `+actualProductInfoMap);
        expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
        expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
        expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
        expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
        expect.soft(actualProductInfoMap.get('ProdcuctPrice')).toBe('$2,000.00');
        expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');
    
    })

    test(`@smoke Is Company Logo Visisble on product page`,async({homePage,searchPage,productInfoPage,page,basePage})=>{
        // await homePage.performSearch('macbook');
        // await page.waitForTimeout(5000);
        // await searchPage.selectProduct('MacBook Pro');
        expect(await productInfoPage.isLogoVisisble()).toBeTruthy();
        expect(await basePage.isLogoVisisble()).toBeTruthy();
    
    })

    test(`@smoke footers count on product page`,async({basePage,productInfoPage})=>{
        // await homePage.performSearch('macbook');
        // await page.waitForTimeout(5000);
        // await searchPage.selectProduct('MacBook Pro');
        expect(await productInfoPage.getPageFootersCount()).toBe(16);
        expect(await basePage.getPageFootersCount()).toBe(16);
    
    })

  //  Assignment
    //// add quantity
    // add to cart
    // verifdy succeesful message
    // click add cart
    // click on shopping cart page
    // page class for cart page
    // add tests

// Register Page with data driven