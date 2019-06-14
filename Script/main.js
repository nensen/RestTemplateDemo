const dataModule = require('./dataModel');
const request = require('request');
const rp = require('request-promise');

// Use instead of rp in case server is using proxy
const proxiedRequest = rp.defaults({
    'proxy': "http://1.1.1.1:12345/"
});

const serviceBaseAddress = "https://eb351b1e-b270-4b24-97cf-6a73eab00a17.mock.pstmn.io/";

(async function () {
    const dataModel = dataModule.data

    const headers = await getHeaders().catch(err => {
        console.log(err);
    });

    if (!headers) return;
    
    for (const user of dataModel.users) {
        // CREATE
        const createdUser = await createUser(user, headers).catch(err => {
            console.log(`Creating user: ${user.userName} failed r`); 
            console.log(err);
        });

        // GET
        const retrievedUser = await getUser(createdUser.Id, headers).catch(err => {
            console.log(`Retrieving user: ${user.userName} failed r`); 
            console.log(err);
        });

        // UPDATE
        retrievedUser.addressLine1 = "Test Line Updated";
        const updatedUser = await updateUser(retrievedUser, headers).catch(err => {
            console.log(`Updating user: ${user.userName} failed r`); 
            console.log(err);
        });

        // DELETE
        const deletedUserStatus = await deleteUser(createdUser.Id, headers).catch(err => {
            console.log(`Deleting user: ${user.userName} failed r`); 
            console.log(err);
        });
    }
})();

async function getHeaders() {
    let jsonResponse = await getToken();
    let tokenResponse = JSON.parse(jsonResponse);
    let token = tokenResponse.token_type + " " + tokenResponse.access_token;

    return {
        "Authorization": token,
        "Content-Type": "application/json"
    };
}

async function getToken() {
    return rp({
        url: serviceBaseAddress +"/OAuth/Token",
        method: "POST",
        body: "grant_type=password&username=user@test.com&password=Test"
    });
}

// REST CRUD

async function createUser(entity, headers) {
    return rp({
        url: serviceBaseAddress + "/api/v1/users",
        method: "POST",
        headers: headers,
        json: true,
        body: entity
    });
}

async function getUser(id, headers) {
    return rp({
        url: serviceBaseAddress + `/api/v1/users/${id}`,
        method: "GET",
        headers: headers,
        json: true
    });
}

async function updateUser(entity, headers) {
    return rp({
        url: serviceBaseAddress + "/api/v1/users",
        method: "PUT",
        headers: headers,
        json: true,
        body: entity
    });
}

async function deleteUser(id, headers) {
    return rp({
        url: serviceBaseAddress + `/api/v1/users/${id}`,
        method: "DELETE",
        headers: headers
    });
}
