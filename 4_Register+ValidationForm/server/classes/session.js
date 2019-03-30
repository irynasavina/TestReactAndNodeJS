const session = new Map();

newSession = function (sessionID, userId, login, roles) {
    session.set(sessionID, { userId: userId, login: login, roles: roles });
}

getSession = function (sessionID) {
    return session.get(sessionID);
}

getSessionRoles = function(sessionID) {
    let result = {};
    let session = getSession(sessionID);
    if (session) {
        result.error = false;
        result.roles= session.roles;
    } else {
        result.error = true
    }
    return result;
}

removeSession = function(sessionID) {
    let result = {};
    if (session.has(sessionID)) {
        result.error = false;
        session.delete(sessionID);
    } else {
        result.error = true;
    }
    return result;
}

exports.newSession = newSession;
exports.getSession = getSession;
exports.getSessionRoles = getSessionRoles;
exports.removeSession = removeSession;