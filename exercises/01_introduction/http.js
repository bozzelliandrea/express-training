const https = require('https');

function request() {
    return new Promise(resolve => {
        https.get({host: "some-random-api.ml", path: "/animal/dog"}, response => {
            let data = '';
            response.on('data', _data => (data += _data));
            response.on('end', () => resolve(data));
        });
    });
}

request().then(res => console.log(res))