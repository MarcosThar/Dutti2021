const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();

router.get('/', function (req, res) {
    console.log(req)
    res.send("Hello World!");
});

router.post('/api/auth/login', function (req, res) {
    res.send({ hola: req.body });
});

router.post('/api/auth/register', function (req, res) {
    req.body
    res.send({ hola: req.body });
});


app.use(router);
app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});