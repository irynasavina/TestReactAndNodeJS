const crypto = require('crypto');

const mysql = require('../classes/mysql');
const utils = require('../classes/utils');
const session = require('../classes/session');

login = async function(login, password) {
    return new Promise(async (resolve, reject) => {
        let result = {}; // Это пустой объект для результата, заполнется ниже
        try {
            let datasets = await mysql.callProcedure('Login', [login]);
            let datasetUser = datasets[0];
            let datasetRoles = datasets[1];
            if (datasetUser.length == 1) { // если рекорд 1, то все в порядке
                let passwordHash = utils.cryptoData(password + '::' + login);
                if (passwordHash == datasetUser[0].password) {
                    let name = datasetUser[0].name; // Выгребаем имя залогинившегося юзера
                    let userId = datasetUser[0].id;
                    result.message = 'Добро пожаловать, ' + name + '!'; // Формииуем привественное сообщение
                    let sessionID = crypto.randomBytes(32).toString('hex');
                    result.sessionID = sessionID;
                    let roles = [];
                    for (let role of datasetRoles) {
                        roles.push(role.role_ref);
                    }
                    result.roles = roles;
                    session.newSession(sessionID, userId, login, roles);
                } else { // Иначе посылыем юзера, что пароль неправильный
                    result.error = true;
                    result.message = 'Неправильный пароль';
                }
            } else { // Иначе посылаем юзера, что логин неправильный
                result.error = true;
                result.message = 'Логин неправильный'
            }
        } catch (error) {
            reject(error)
        }
        resolve(JSON.stringify(result));
    });
}

validateRequiredFields = function(login ,password, email) {
    let error = false;
    let messages = [];
    if (login === '') {
        error = true;
        messages.push('Login is required');
    }
    if (password === '') {
        error = true;
        messages.push('Password is required');
    }
    if (email === '') {
        error = true;
        messages.push('Email is required');
    }
    return { error: error, messages: messages };
}

register = async function(login, password, name, email) {
    return new Promise(async (resolve, reject) => {
        let result = validateRequiredFields(login, password, email);
        if (!result.error) {
            try {
                // Валидация уникальности логина и e-mail
                let datasets = await mysql.callProcedure('ValidateRegisterParams', [login, email]);
                let datasetLogin = datasets[0];
                if (datasetLogin.length > 0) {
                    result.error = true;
                    result.messages.push(`Логин '${login}' уже используется`);
                }
                let datasetEmail = datasets[1];
                if (datasetEmail.length > 0) {
                    result.error = true;
                    result.messages.push(`E-mail '${email}' уже используется`);
                }
                if (!result.error) {
                    // Регистрация
                    let passwordHash = utils.cryptoData(password + '::' + login);
                    let response = await mysql.callProcedure('UserCreate', [login, passwordHash, name, email]);
                    let dataset = response[0];
                    if (dataset.length == 1) {
                        result.error = false;
                        let userId = dataset[0].userId;
                        let sessionID = crypto.randomBytes(32).toString('hex');
                        result.sessionID = sessionID;
                        result.roles = ['USR'];
                        result.message = 'Добро пожаловать, ' + name + '!';
                        session.newSession(sessionID, userId, login, result.roles);
                    }
                }
            } catch (error) {
                reject(error);
            }
        }
        resolve(JSON.stringify(result));
    });
}

exports.login = login;
exports.register = register;