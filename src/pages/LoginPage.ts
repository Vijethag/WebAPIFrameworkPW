import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    //private locators
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly loginButton:Locator;
    private readonly forgottenPassword:Locator;
    readonly error:Locator;

    //Constructor of the class
    // Initialize locators
    constructor(page:Page){
        super(page);
        this.emailId =  page.getByRole('textbox',{name:'E-Mail Address'});
        this.password =  page.getByRole('textbox',{name:'Password'});
        this.loginButton =  page.getByRole('button',{name:'Login'});
        this.forgottenPassword =  page.getByRole('link',{name:'Forgotten Password'}).first();
        this.error = page.locator('.alert-danger').filter({ hasText: 'Warning:' });
    }

    // public page actions(methods)/behavior

    async goToLoginPage():Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login')
    }

    async getLoginPageTitle():Promise<string>{
        return await this.page.title();
    }

    async isForgottenPasswordLinkExists():Promise<boolean>{
        return await this.forgottenPassword.isVisible();
    }

    async doLogoin(username:string,password:string):Promise<void>{
        console.log(`user credentials ${username}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginButton.click({timeout:10000});
    }

    async isInvaliLoginDisplayed():Promise<void>{
       return await expect(this.error).toBeVisible();
    }


    // async isInvaliLoginDisplayedNoExpect():Promise<boolean>{
    //     return await this.error.isVisible();
    //  }

}