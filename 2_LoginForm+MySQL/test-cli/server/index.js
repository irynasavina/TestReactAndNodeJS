const express = require('express'); // Библиотека экспресс, очень много упрощает
//const crypto = require('crypto'); Это пока не нужно, чуток попозже будет нужно
const bodyParser = require('body-parser'); // Этот модуль нужен для расшифровки параметров, переданных от клиента методом POST

const mysql = require('./classes/mysql.js');

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
    login = login.replace("'", "''"); // Обязательно экранируем в логине апострофы, потому как будем пихать его в sql. А вдруг какой-то умник введет в поле логин апостроф
    try {
        // вызываем асинхронно метод sql из нашего модуля mysql
        // Вот так делать неправильно (склеивать sql зарос простой строкой): чревато взломом через SQL-инъекции (потом расскажу), но для начала сойдет
        let dataset = await mysql.sql("SELECT password, name FROM users WHERE login = '" + login + "';");
        // метод sql вернул датасет в виде строки JSON, парсаем ее в объект
        let data = JSON.parse(dataset);
        let result = {}; // Это пустой объект для результата, заполнется ниже
        // так как в запросе был черкий WHERE по логину, то нам должен приехать один рекорд или ниодного, если логин был неправильный
        if (data.length === 1) { // если рекорд 1, то все в порядке
            let p = data[0].password; // вытаскиваем из первого (и единственного) рекорда поле `password`
            if (p == password) { // Если пароль из БД совпадает с паролем, который приехал с клиента (излогин формы), то все в порядке
                result.error = false;
                let name = data[0].name; // Выгребаем имя залогинившегося юзера
                result.message = 'Добро пожаловать, ' + name + '!'; // Формииуем привественное сообщение
            } else { // Иначе посылыем юзера, что пароль неправильный
                result.error = true;
                result.message = 'Неправильный пароль';
                }
        } else { // Иначе посылаем юзера, что логин неправильный
            result.error = true;
            result.message = 'Логин неправильный'
        }
        res.send(JSON.stringify(result)); // преобразуем объект result в строку JSON и отсылаем обратно на клиент
    } catch (error) {
        console.error(error); // Если возникла ошибка, выводим ее на консоль (или в лог на продакшине)
    }
});

app.listen(app.get('port'),
    function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    }
);
