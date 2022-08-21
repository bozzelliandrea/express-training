const express = require('express')
const app = express();
const fs = require('fs');

app.use(express.json());

app.get('/', (req, res) => {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});


app.post('/add', (req, res) => {
    fs.appendFile('text.txt', req.body.value + '\n', err => {
        if (err) throw err;
        console.info("saved!");
        return res.end();
    })
})

app.get('/read', (req, res) => {
    fs.readFile('text.txt', function (err, data) {
        try {
            res.write(data);
        } catch (err) {
            res.write(Buffer.from(''));
        }
        return res.end();
    });
})

app.listen(3000, () => {
    console.log(`Example app listening on port http://localhost:${3000}`)
})