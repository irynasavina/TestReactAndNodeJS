import Cookies from 'universal-cookie';

const sessionID = 'sessionID';

export default class Session {
    static getSessionID() {
        const cookies = new Cookies();
        return cookies.get(sessionID);
    }

    static removeSession() {
        const cookies = new Cookies();
        cookies.remove(sessionID);
    }
}