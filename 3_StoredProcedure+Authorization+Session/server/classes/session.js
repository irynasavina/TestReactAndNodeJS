const session = new Object();

newSession = function (sessionID, userId, login, roles) {
    session[sessionID] = { userId: userId, login: login, roles: roles };
    console.log(session[sessionID]);
}

getSession = function (sessionID) {
    return session[sessionID];
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

exports.newSession = newSession;
exports.getSession = getSession;
exports.getSessionRoles = getSessionRoles;