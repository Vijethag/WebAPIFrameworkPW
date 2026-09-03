import {test as baseTest} from '@playwright/test';
import { ApiHelper } from '../api/ApiHelper';


// define types for page fixtures

type apiHelper = {
    apiHelper:ApiHelper,
}

// extend playwright base test
export let test = baseTest.extend<apiHelper>({

    apiHelper:async({request},use)=>{
        let apiHelper = new ApiHelper(request,process.env.API_BASE_URL!);
        await use(apiHelper);
    },
});

export {expect} from '@playwright/test';