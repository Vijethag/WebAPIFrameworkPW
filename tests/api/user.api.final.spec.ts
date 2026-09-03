
import { ApiHelper } from '../../src/api/ApiHelper';
import {expect,test} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = {Authorization : `Bearer ${TOKEN}`}

let userData = {
    "name": "apiauto",
    "email": `automation_${Date.now()}@open.com`,
    "gender": "female",
    "status": "active"
};

//post-get
//post-put-get
//post-delete

// helper - generic function -create a fresh user
async function createUser(apiHelper:ApiHelper){
  

    let response = await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
    return response.body;
 
}

test('POST Request - 1',async({apiHelper})=>{
    let userResponse = await createUser(apiHelper);
    console.log(userResponse);
    let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    console.log(response.status);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userData.name);
});

// TestCAse2 : POST--UserID -- PUT -- GET?UserId --verify

test('PUT Request - 1',async({apiHelper})=>{
    let userResponse = await createUser(apiHelper);

    let userUpdatedData = {
        "name": "apiauto updated",
        "status": "inactive"
    };

    let response = await apiHelper.put(`/public/v2/users/${userResponse.id}`,userUpdatedData,AUTH_HEADER);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);
    expect(response.body.status).toBe(userUpdatedData.status);
});

test('DELETE Request - 1',async({apiHelper})=>{
    let userResponse = await createUser(apiHelper);

    let deleteResponse = await apiHelper.delete(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    expect(deleteResponse.status).toBe(204);
    let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Resource not found');
});


test.skip('PATCH Request - 1',async({apiHelper})=>{
    let userResponse = await createUser(apiHelper);

    let userUpdatedData = {
        "status": "inactive"
    };

    let response = await apiHelper.patch(`/public/v2/users/${userResponse.id}`,userUpdatedData,AUTH_HEADER);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(userUpdatedData.status);
});

// Intercepting and Mocking
