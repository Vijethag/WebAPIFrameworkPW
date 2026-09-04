import {test,expect} from '@playwright/test'

//  Goto web application --> intercept network calls and log
/**
 *  = wildcard - matched all the URLS
 * 
 */

test('@smoke intercept and log the request',async({page})=>{
    await page.route('**/*',async(route)=>{
        console.log(route.request().method(),route.request().url());
        await route.continue();
    })

    // login steps with web
    // check the backend parameters is being sent in the form submission

    // manipulate the request parameter and sql injection and XSS scripting

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

});

//intercept with mocking
//mocking:fake data/dummy response or data
// generate test data 
// You are working in a company and you have to automate the hardware

test('@regression Mock search data api',async({page})=>{

  //  Instead of allowing the browser to call the real backend API, 
  // Playwright intercepts that API request and returns your fake response
    let mockProducts =[
        {name:'Fake Macbook Pro',price:"$599"},
        {name:'Fake Macbook Pro',price:"$599"},
    ]

    await page.route('**/index.php?route=product/search&search=macbbok',async(route)=>{
        route.fulfill({
            status:200,
            contentType:'application/json',
            body: JSON.stringify(mockProducts),
        })
    })

    await page.goto('https://naveenautomationlabs.com/index.php?route=product/search&search=macbbok');

    let fakeResponse = await page.evaluate(async()=>{
        let response = await fetch('https://naveenautomationlabs.com/index.php?route=product/search&search=macbbok');
        return response.json(); // Deserializtion
    });

    console.log(fakeResponse);

})


