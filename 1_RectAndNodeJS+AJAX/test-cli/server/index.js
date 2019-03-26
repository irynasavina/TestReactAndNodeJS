const express = require('express'); // Библиотека экспресс, очень много упрощает
//const crypto = require('crypto'); Это пока не нужно, чуток попозже будет нужно
const bodyParser = require('body-parser'); // Этот модуль нужен для расшифровки параметров, переданных от клиента методом POST

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));  // Подключаем bodyParser

app.set('port', (process.env.PORT || 3006)); // Устанавливаем порт или из параметров командной строки или 3006 по умолчанию

// Это магия, чтобы можно было и React, и nodeJS запустить в отдельных консольках на отдельных портах
// Сервер здесь дает разрешения на обращение к себе с других доменов.
// Это несекурно и на продакшене, конечно, надо отключить
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3007");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Тестовый медод, демонстрирующий, как принимать GET запросы
// Например, этот метод принимает параметр `n` и вазвращает массив, перемноженный на `n`
// Пример вызов из браузера: http://localhost:3006/mult?n=2
app.get('/mult', function(req, res) {
    let array = [10, 20, 30]; // Этот массив сервер может тянуть из базы данных (к примеру, зарплаты сотрудников)
    let n = req.query.n; // Так добывается параметры из строки вызова
    for (let i in array) {
        array[i] = array[i] * n;
    }
    console.log(array);
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"}); // Передаем заголовок обязательно
    res.write(JSON.stringify(array)); // Сюда можно кидать только строку, преобразуем массив в строку в формате JSON
    res.end(); // Оконание обработки, иначе браузер подвиснет
});

// Тестовый метод, демонстрирующий, как принимать POST запросы (данные форм всегда отправляются только POST-ом)
app.post('/login', function(req, res) {
    let login = req.body.login; // Так добываем из запроса POST данные ligin и password
    let password = req.body.password;
    console.log(login, password); // Тут надо вытянуть из базы данных оригинальные логин и пароль к нему и сравнить, но это в след. уроке
    res.send('Авторизация типа успешна: ' + login + ' ' + password); // Отсылаем клиенту ответ
});

app.listen(app.get('port'),
    function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
        //let data = "do shash'owania";
        //console.log(crypto.createHash('md5').update(data).digest("hex"));
    }
);