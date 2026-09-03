import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    //Locators
    private readonly logoutLink:Locator;
    private readonly headers:Locator;

    constructor(page:Page){
        super(page);
        this.logoutLink = page.getByRole('link',{name:'Logout'});
        this.headers = page.getByRole('heading',{level:2});
    }

    async getAllHeaders():Promise<string[]>{
        return await this.headers.allInnerTexts()
    }

    async isLogoutLinkExist():Promise<boolean>{
        return await this.logoutLink.isVisible();
    }

    async performSearch(searchText:string):Promise<void>{
        console.log(`Search key is ${searchText}`);
        this.searchFiled.fill(searchText);
        this.searchIcon.click();
    }

}