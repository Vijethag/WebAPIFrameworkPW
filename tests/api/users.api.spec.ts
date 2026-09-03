
import {expect,request,test} from '@playwright/test';
import { userInfo } from 'os';

let AUTH_TOKEN = {Authorization:'Bearer b59bb164bf45856c9d686bc1b380b12a81c4efa3c7a7ce6f76b21d056dc098b6'};

test('GET Users',async({request})=>{
   let response =  await request.get('https://gorest.co.in/public/v2/users',{
        headers:AUTH_TOKEN
    });

    // console.log(response);

    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.statusText());
    console.log(response.status());
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");

});

// AAA  - POST
// 1.create a User
// 2.fetch the userID = 123
//3.get the same user with the same userId=123

//Update:
// 1.create a user - POST - 201
// 2.fetch the userID = 123  - 909
// update the user with the same userId=123 - PUT - 456
// get the same user with the same userId=123 - GET - 456

// Delete
// 1.create a user - POST - 201
// 2.fetch the userID = 123 909
// delete the user with the same userId=123 - PUT - 204
// get the same user with the same userId=123 - GET - 404

// GET
// 1.create a user - POST - 201
// 2.fetch the userID = 123 909
// get the same user with the same userId=123 - GET - 200


test.skip('create a user test',async({request})=>{

    let userData = {
            "name": "Anika",
            "email": `automation_${Date.now()}@open.com`,
            "gender": "female",
            "status": "active"
    };

    let response =  await request.post('https://gorest.co.in/public/v2/users',{
         headers:AUTH_TOKEN,
         data:userData
     });
 
     // console.log(response);
     // JSON Object to JSON : Serialization Marshelling
     // PlayWright - Autoserialization
     let jsonBody = await response.json();
     console.log(jsonBody);
 
     // expect(response.status).toBe(200);
     // ;
     console.log(response.statusText());
     console.log(response.status());

     expect(response.status()).toBe(201);
     expect(response.statusText()).toBe("CREATED");
 });

 test('Update a user test',async({request})=>{

    let userData = {
            "name": "Anika",
            "email": `automation_${Date.now()}@open.com`,
            "gender": "female",
            "status": "inactive"
    };

    let response =  await request.put('https://gorest.co.in/public/v2/users/8601018',{
         headers:AUTH_TOKEN,
         data:userData
     });
 
     // console.log(response);
     // JSON Object to JSON : Serialization Marshelling
     // PlayWright - Autoserialization
     let jsonBody = await response.json();
     console.log(jsonBody);
 
     // expect(response.status).toBe(200);
     // ;
     console.log(response.statusText());
     console.log(response.status());
 });

 test('Delete a user test',async({request})=>{

    let userData = {
            "name": "Anika",
            "email": `automation_${Date.now()}@open.com`,
            "gender": "female",
            "status": "inactive"
    };

    let response =  await request.delete('https://gorest.co.in/public/v2/users/8601019',{
         headers:AUTH_TOKEN,
         data:userData
     });

     // expect(response.status).toBe(200);
     // ;
     console.log(response.statusText()); // No Content
     console.log(response.status()); // 204
 });