
import { test, expect } from '@playwright/test'
import http from 'http';
import { AddressInfo } from 'net';

// Amadeus test env is not reachable, so oauth + location GET is mocked locally

let OAUTH_CONFIG = {
    clientID: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!,
}

let mockServer: http.Server;
let amadeusBaseURL: string;
let accessToken: string;

test.beforeAll(async () => {
    mockServer = http.createServer((req, res) => {
        const url = new URL(req.url || '/', 'http://127.0.0.1');

        if (req.method === 'POST' && url.pathname === '/v1/security/oauth2/token') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                const params = new URLSearchParams(body);
                const isValidGrant =
                    params.get('grant_type') === OAUTH_CONFIG.grantType &&
                    params.get('client_id') === OAUTH_CONFIG.clientID &&
                    params.get('client_secret') === OAUTH_CONFIG.clientSecret;

                if (!isValidGrant) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'invalid_client' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    access_token: 'mock-amadeus-access-token',
                    token_type: 'Bearer',
                    expires_in: 1799
                }));
            });
            return;
        }

        if (req.method === 'GET' && url.pathname === '/v1/reference-data/locations') {
            if (req.headers.authorization !== 'Bearer mock-amadeus-access-token') {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'invalid_token' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                meta: { count: 1 },
                data: [{
                    name: 'MUNICH INTERNATIONAL',
                    iataCode: 'MUC',
                    subType: 'AIRPORT',
                    address: { cityName: 'MUNICH', countryCode: 'DE' }
                }]
            }));
            return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'not_found' }));
    });

    await new Promise<void>(resolve => mockServer.listen(0, '127.0.0.1', resolve));
    const { port } = mockServer.address() as AddressInfo;
    amadeusBaseURL = `http://127.0.0.1:${port}`;
});

test.afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
        mockServer.close(err => err ? reject(err) : resolve());
    });
});

test.beforeEach('POST - generate the access token',async({request})=>{
    let response = await request.post(`${amadeusBaseURL}/v1/security/oauth2/token`,
        {
            form: {
                grant_type : OAUTH_CONFIG.grantType,
                client_id: OAUTH_CONFIG.clientID,
                client_secret : OAUTH_CONFIG.clientSecret
            }
        });
    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();

    console.log(jsonResponse);
    accessToken = jsonResponse.access_token;

    console.log(jsonResponse);
    
});

test('@regression GET -- get location data', async ({ request }) => {

    //https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MUC&countryCode=DE
    let endPointURL = '/v1/reference-data/locations';

    let queryParam = {
        subType: 'CITY,AIRPORT',
        keyword: 'MUC',
        countryCode: 'DE'
    };

    let locationResponse = await request.get(`${amadeusBaseURL}${endPointURL}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        params: queryParam

    });

    expect(locationResponse.status()).toBe(200);
    console.log(await locationResponse.json());

    let locationJson = await locationResponse.json();
    console.log(locationJson.meta.count);

    let location1 = locationJson.data[0];
    console.log(location1);
    expect(locationJson.meta.count).toBeGreaterThan(0);
    expect(location1.iataCode).toBe('MUC');
});
