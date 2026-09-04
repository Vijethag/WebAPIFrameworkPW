# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/interception.spec.ts >> @smoke intercept and log the request
- Location: tests/api/interception.spec.ts:9:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=common/home", waiting until "load"

```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | //  Goto web application --> intercept network calls and log
  4  | /**
  5  |  *  = wildcard - matched all the URLS
  6  |  * 
  7  |  */
  8  | 
  9  | test('@smoke intercept and log the request',async({page})=>{
  10 |     await page.route('**/*',async(route)=>{
  11 |         console.log(route.request().method(),route.request().url());
  12 |         await route.continue();
  13 |     })
  14 | 
  15 |     // login steps with web
  16 |     // check the backend parameters is being sent in the form submission
  17 | 
  18 |     // manipulate the request parameter and sql injection and XSS scripting
  19 | 
> 20 |     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  21 | 
  22 | });
  23 | 
  24 | //intercept with mocking
  25 | //mocking:fake data/dummy response or data
  26 | // generate test data 
  27 | // You are working in a company and you have to automate the hardware
  28 | 
  29 | test('@regression Mock search data api',async({page})=>{
  30 | 
  31 |   //  Instead of allowing the browser to call the real backend API, 
  32 |   // Playwright intercepts that API request and returns your fake response
  33 |     let mockProducts =[
  34 |         {name:'Fake Macbook Pro',price:"$599"},
  35 |         {name:'Fake Macbook Pro',price:"$599"},
  36 |     ]
  37 | 
  38 |     await page.route('**/index.php?route=product/search&search=macbbok',async(route)=>{
  39 |         route.fulfill({
  40 |             status:200,
  41 |             contentType:'application/json',
  42 |             body: JSON.stringify(mockProducts),
  43 |         })
  44 |     })
  45 | 
  46 |     await page.goto('https://naveenautomationlabs.com/index.php?route=product/search&search=macbbok');
  47 | 
  48 |     let fakeResponse = await page.evaluate(async()=>{
  49 |         let response = await fetch('https://naveenautomationlabs.com/index.php?route=product/search&search=macbbok');
  50 |         return response.json(); // Deserializtion
  51 |     });
  52 | 
  53 |     console.log(fakeResponse);
  54 | 
  55 | })
  56 | 
  57 | 
  58 | 
```