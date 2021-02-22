const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const base = '' // Durante el desarrollo de la api podemos definir esta variable y levantar la api fuera del proyecto para mayor comodida y de esta forma no tener que estar compilando front cada vez que modificamos algo en back, tambien se puede usar para definir una ruta padre don de se alojara el user.json en caso de ser necesario.

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();

const users = [];


const onReadFile = (err, data, user, res, callback) => {
    if (err) { res.status(500) }
    if (data) {
        users.push(...JSON.parse(data))
        callback(user, res)
    }
}

const post = (req, res, callback) => {
    // si ya se han obtenido los valores del archivo users.json no se vuelven a pedir
    setTimeout(() => { // Se incluye timeout para simular la latencia del servidor y poder visualizar el spinner
        
        if (!users.length) {
            fs.readFile(
                `${base || '.'}/users.json`,
                (err, data) => onReadFile(err, data, req.body, res, callback)
                )
            } else {
                callback(req.body, res)
            }
        }, 1000);
}

const saveUser = (user, res) => {
    users.push(user);
    fs.writeFile(`${base || '.'}/users.json`, JSON.stringify(users), (err) => {

        if (err) throw err;
        console.log('Saved!');
        res.status(201).send({user, msg: 'The user have been registered' })
    })

}

const userIsRegistered = (user) =>
    users.find(userA => userA.username === user.username || userA.email === user.email)

const userIsValid = (user) =>
    users.find(userA => userA.username === user.username && userA.password === user.password)

const callbackRegisterUser = (user, res) => {
    if (userIsRegistered(user)) {
        res.status(409).send({ msg: 'User is already registered' })
    } else {
        saveUser(user, res);
    }
}

const callbackLoginUser = (user, res) => {
    if (userIsValid(user)) {
        res.status(200).send({ msg: 'User is valid' })
    } else {
        res.status(401).send({ msg: 'User or password are incorrect' })
    }
}

router.post('/api/auth/login', (req, res) => post(req, res, callbackLoginUser ));
router.post('/api/auth/register',  (req, res) =>post(req, res, callbackRegisterUser));

app.use(router);
app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});


