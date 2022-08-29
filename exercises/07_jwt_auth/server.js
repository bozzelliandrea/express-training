const express = require('express');
const dotenv = require('dotenv');
// object destructuring with rename {property: new_name_property}
const {router: user_route} = require('./route/user.route')

const app = express();

app.use(
    express.json(),
    express.urlencoded({
        extended: true
    })
);
app.use('/users', user_route);
// root
app.get('/', (req, res) => {
    res.send("Welcome to JWT Server")
});

app.listen(3000, () => {
    dotenv.config();
    console.log("App listening in http://localhost:3000");
})
