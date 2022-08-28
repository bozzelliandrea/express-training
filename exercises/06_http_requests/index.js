const https = require("node:https");
const http = require("node:http");

const options = {
    hostname: 'random-data-api.com',
    path: '/api/v2/users?size=2',
    method: 'GET',
};

const user_option = {
    hostname: 'localhost',
    port: '3000',
    path: '/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        // process.stdout.write(d);
        const user_req = http.request(user_option, res => {

        });

        const userReqArray = [];
        for (const obj of JSON.parse(d.toString())) {
            // user_req.write(Buffer.from(JSON.stringify(obj)));
            userReqArray.push(
                {
                    name: obj["first_name"],
                    last_name: obj["last_name"],
                    username: obj["username"],
                    email: obj["email"],
                    password: obj["password"]
                }
            )
        }

        // const json_req = JSON.parse(d.toString());

        user_req.write(Buffer.from(JSON.stringify(userReqArray)));
        user_req.end();
    });

    res.on('error', e => {
        console.error(e);
    })
});

req.on('error', error => {
    console.error(error);
});

req.end();
