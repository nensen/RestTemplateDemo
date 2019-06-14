const roles = {
    "admin": "Admin",
    "user": "User",
}

const data = {
    users: [{
        "userName": "john.doe@test.com",
        "firstName": "John",
        "lastName": "Doe",
        "addressLine1": "Test Address 1",
        "country": "Slovakia",
        "city": "Bratislava",
        "zipCode": 12345,
        "role": roles.admin
    }]
};

module.exports = {
    "data" : data
};
