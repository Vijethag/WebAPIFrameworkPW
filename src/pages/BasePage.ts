import { Locator, Page } from "@playwright/test";


export class BasePage{

    protected readonly page:Page;

    // Common Locators/functionalities/actions
    // Directly fromparent class can be accessible
    protected readonly logo:Locator;
    protected readonly searchFiled:Locator;
    protected readonly searchIcon:Locator;
    protected readonly footerLinks:Locator;
    protected readonly currency:Locator;
    protected readonly cartButton:Locator;


    constructor(page:Page){
        this.page = page;
        this.logo = page.getByAltText('naveenopencart');
        this.searchFiled = this.page.getByRole('textbox',{name:'Search'});
        this.searchIcon = this.page.locator('.fa.fa-search');
        this.currency = this.page.locator('#form-currency');
        this.footerLinks = this.page.locator('footer a');
        this.cartButton = this.page.locator(`#cart > button`);

    }

    // Helper/Generic methods
    // In slenium element utility - wait utilities,flent wait and exception handling ,timeouts,ato handlin error,stale elemeents and sync
    // Avoid to craete Action helpes in Playwright because we have to auto-wait,retry and proper states
    // Avoid to create Action 

    // Common Locators and functionalities

    async isLogoVisisble():Promise<boolean>{
        return await this.logo.isVisible();
    }

    async isSearchBoxVisisble():Promise<boolean>{
        return await this.searchFiled.isVisible();
    }

    async getPageFootersCount():Promise<number>{
        return await this.footerLinks.count(); 
    }

    async getPageFooters():Promise<string[]>{
        return await this.footerLinks.allInnerTexts(); 
    }

    async isCurrencyVisisble():Promise<boolean>{
        return await this.currency.isVisible();
    }


    async isCartButtonVisisble():Promise<boolean>{
        return await this.cartButton.isVisible();
    }

    async getPageTitle():Promise<string>{
        return await this.page.title();
    }

    getCurrentUrl():string{
        return this.page.url();
    }

    async waitForPageLoad():Promise<void>{
        await this.page.waitForLoadState('load');
    }

    async takeScreenshot(name:string){
        return await this.page.screenshot({
            fullPage:true,
            path:`reports/screenshot/${name}.png`
        });
    }




    
}