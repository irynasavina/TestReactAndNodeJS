const sessions = new Map();

newSession = function (sessionID, userId, login, roles) {
    sessions.set(sessionID, { userId: userId, login: login, roles: roles, lastGet: new Date() });
}

getSession = function (sessionID) {
    let session = sessions.get(sessionID);
    if (session != undefined) {
        session.lastGet = new Date();
        console.log(sessions);
    }
    return session;
}

checkSessions = function () {
    let now = new Date().getTime();
    sessions.forEach(function(session, sessionID) {
        if (now - session.lastGet.getTime() > 1000 * 60 * 60) {
            console.log('Session for remove', session);
            removeSession(sessionID);
            console.log(sessions);
        }
    })
}

let timer = setInterval(checkSessions, 60 * 1000);

getSessionRoles = function(sessionID) {
    let result = {};
    let session = getSession(sessionID);
    if (session) {
        result.error = false;
        result.roles= session.roles;
    } else {
        result.error = true
    }
    return JSON.stringify(result);
}

removeSession = function(sessionID) {
    let result = {};
    if (sessions.has(sessionID)) {
        result.error = false;
        sessions.delete(sessionID);
    } else {
        result.error = true;
    }
    return JSON.stringify(result);
}

exports.newSession = newSession;
exports.getSession = getSession;
exports.getSessionRoles = getSessionRoles;
exports.removeSession = removeSession;