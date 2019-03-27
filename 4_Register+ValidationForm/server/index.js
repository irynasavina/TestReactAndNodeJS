const express = require('express'); // Библиотека экспресс, очень много упрощает
const bodyParser = require('body-parser'); // Этот модуль нужен для расшифровки параметров, переданных от клиента методом POST
const authorization = require('./classes/authorization');

const session = require('./classes/session');
const utils = require('./classes/utils');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));  // Подключаем bodyParser

app.set('port', (process.env.PORT || 3006)); // Устанавливаем порт или из параметров командной строки или 3006 по умолчанию

// Это магия, чтобы можно было и React, и nodeJS запустить в отдельных консольках на отдельных портах
// Сервер здесь дает разрешения на обращение к себе с других доменов.
// Это несекурно и на продакшене, конечно, надо отключить
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Этот метод принимает от клиента данные методом POST, url обращения выглядит так http://localhost/login
app.post('/login', async function(req, res) {
    let login = req.body.login; // вытаскиваем параметры из запроса
    let password = req.body.password;
    let result = await authorization.login(login, password);
    console.log(result);
    res.send(result);
});

app.get('/get-roles', function(req, res) {
    let result = session.getSessionRoles(req.query.sessionID);
    res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
    res.write(JSON.stringify(result));
    res.end();
});

app.listen(app.get('port'),
    function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
        console.log(utils.cryptoData('Vjhlfcbr::tigra'));
        
    }
);