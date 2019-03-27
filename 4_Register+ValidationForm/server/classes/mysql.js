const mysql = require('mysql');

// Это конфиг коннекшена. У тебя он скорее всего будет отличаться от моего
connectionConfig = {
    host: "localhost", // host - для локального сервера localhost, для сервера в сети или удаленного тут будет адрес типа mysq://132.12.21.45
    port: 3306, // В принципе, MySQL всегда живет на этом порту, но могут быть варианты, зависит от провайдера
    user: "root", // юзер, под которым заходишь на сервер. По-хорошему, для каждого приложения лучше делать отдельного юзера для секурности
    password: "********", // Пароль
    database: "mydb" // Название базы данных
};

// Этот метод оздает коннекшен к MySQl серверу
initializeConnection = function() {
    // Это магия восстанавливать потеряный коннекшен. Нарыла в Интернете, пока не тестировала, как работает.
    // По опыту MySQL обрубает коннекшен, если не было обращений какое-то время
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection();
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    let connection = mysql.createConnection(connectionConfig); // создаем коннекшен
    addDisconnectHandler(connection);
    connection.connect(); // коннектимся
    return connection;
}

connection = initializeConnection(); // создаем коннекшн один раз, потом просто его юзаем

// Этот метод выполняет произвольный sql запрос типа select и возвращает результат
sql = function(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.stringify(result)); // Результат преобразуем в строку формата JSON
            }
        });
    });
}

callProcedure = function(procedureName, params) {
    return new Promise(async (resolve, reject) => {
        let = paramStr = '';
        let was = false;
        for (let param of params) {
            if (was) {
                paramStr += ", ";
            }
            switch (typeof param) {
                case 'string': 
                    paramStr += "'" + param.replace("'", "''") + "'"
                    break;
                case 'number':
                    paramStr += param;
                    break;
            }
            was = true
        }
        let sql = "CALL " + procedureName + "(" + paramStr + ")";
        let result = await this.sql(sql);
        resolve(JSON.parse(result));
    })
}

exports.sql = sql;
exports.callProcedure = callProcedure;