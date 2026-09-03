
import {expect,test} from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = {Authorization : `Bearer ${TOKEN}`}
let userID: number;

test.describe.serial('running end to end go rest CRUD API test',()=>{
    test('Get Request',async({apiHelper})=>{
        let response = await apiHelper.get('/public/v2/users',AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    
    test('POST Request',async({apiHelper})=>{
        let userData = {
            "name": "apiauto",
            "email": `automation_${Date.now()}@open.com`,
            "gender": "female",
            "status": "active"
    };
    
        let response = await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(userData.name);
        // expect(response.body.email).toContain(userData);
        expect(response.body.gender).toBe(userData.gender);
        expect(response.body.status).toBe(userData.status);
        userID = response.body.id;
        console.log(userID);
        expect(userID).not.toBeNull();
    });
    
    test('PUT Request',async({apiHelper})=>{
    
    
        let userUpdatedData = {
            "name": "apiauto updated",
            "status": "inactive"
        };
    
        let response = await apiHelper.put(`/public/v2/users/${userID}`,userUpdatedData,AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(userUpdatedData.name);
        expect(response.body.status).toBe(userUpdatedData.status);
    
    });

    test('DELETE USer Request',async({apiHelper})=>{

        let response = await apiHelper.delete(`/public/v2/users/${userID}`,AUTH_HEADER);
        expect(response.status).toBe(204);
    
    });
});
