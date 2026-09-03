import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage{

    //Locators
    private readonly header:Locator;
    private readonly productImages:Locator;
    private readonly productMetadata:Locator;
    private readonly productPricing:Locator;
    private map:Map<string,string | number>;

   

    constructor(page:Page){
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator(`div#content li img`);
        this.productMetadata = page.locator(`div#content ul.list-unstyled:nth-of-type(1) li`);
        this.productPricing = page.locator(`div#content ul.list-unstyled:nth-of-type(2) li`);
        this.map = new Map<string,string|number>();
    }

    async getProductHeader():Promise<string>{
        await this.header.waitFor({state:'visible'});
        return await this.header.innerText();
    }

    async getProductImagesCount():Promise<number>{
        await this.productImages.first().waitFor({state:'visible'});
        return await this.productImages.count();
    }


    private async getProductMeataData():Promise<void>{
        let metaData =  await this.productMetadata.allInnerTexts();
        for (let data of metaData){
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.map.set(metaKey,metaValue);

        }
    }

    private async getPricingData():Promise<void>{
        let pricingData =  await this.productPricing.allInnerTexts();
        let prodcuctPrice = pricingData[0].trim();
        let extTaxPrice = pricingData[1].split(':')[1].trim();
        this.map.set('ProdcuctPrice',prodcuctPrice);
        this.map.set('ExTaxPrice',extTaxPrice);
    }

    async getProductInfo():Promise<Map<string,string|number>>{
        this.map.set('ProductHeader',await this.getProductHeader());
        this.map.set('ProductImages',await this.getProductImagesCount());
        await this.getProductMeataData();
        await this.getPricingData();

        return this.map;
    }

}