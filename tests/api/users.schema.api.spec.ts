
import {Ajv} from 'ajv';

import {expect,test} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = {Authorization : `Bearer ${TOKEN}`}

let ajv = new Ajv();
let userId ;

let userSchema = {
    "type": "object",
    "properties": {
      "id": {
        "type": "number"
      },
      "name": {
        "type": "string"
      },
      "email": {
        "type": "string"
      },
      "gender": {
        "type": "string"
      },
      "status": {
        "type": "string"
      }
    },
    "required": [
      "id",
      "name",
      "email",
      "gender"
    ]
  }

  test('GET - get a user',async({apiHelper})=>{
    let userData = {
        "name": "schema_test",
        "email": `automation_${Date.now()}@open.com`,
        "gender": "male",
        "status": "active"
  };
 // Create USer
    let response = await apiHelper.post('/public/v2/users/',userData,AUTH_HEADER);
    console.log("Create User Response",response);
    let userId = response.body.id;
    console.log("Create User Response ID",response);


    let userResponse =  await apiHelper.get(`/public/v2/users/${userId}`,AUTH_HEADER);
// Schema validation code

console.log("Get User Response ID",userResponse);

    let validate = ajv.compile(userSchema);

   let isSchemaValid =  validate(userResponse.body);

   if(!isSchemaValid){
        console.log("Schema error",validate.errors);
   }

   expect(isSchemaValid).toBeTruthy();

});


let userArraySchema = 
{
    "type": "array",
    "items" :userSchema
  }

  test('GET - get a users array',async({apiHelper})=>{

    let userResponse =  await apiHelper.get(`/public/v2/users`,AUTH_HEADER);
// Schema validation code

   console.log("Get User Response ID",userArraySchema);

    let validate = ajv.compile(userArraySchema);

   let isSchemaValid =  validate(userResponse.body);

   if(!isSchemaValid){
        console.log("Schema error",validate.errors);
   }

   expect(isSchemaValid).toBeTruthy();

});