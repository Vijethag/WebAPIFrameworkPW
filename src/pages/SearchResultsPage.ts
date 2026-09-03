import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage{

    //Locators
    private readonly searchResults:Locator;
   

    constructor(page:Page){
        super(page);
        this.searchResults = page.locator('.product-layout.product-grid');
    }

    async getProductResultsCount():Promise<number>{
       return await this.searchResults.count();
    }


    async selectProduct(productName:string):Promise<void>{
        await this.page.getByRole('link',{name:productName,exact:true}).first().click();
     }
}