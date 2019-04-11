import Ajax from '../utils/ajax';
import Session from '../utils/session';

export default class Roles {
    static getRoles = async () => {
        let sessionID = Session.getSessionID();
        let data = JSON.parse(await Ajax.get('get-roles', 'sessionID=' + sessionID));
        if (!data.error) {
            return data.roles
        }
        return false;
    }

    static hasRole = async (role) => {
        let roles = await Roles.getRoles();
        if (roles) {
            return roles.includes(role)
        }
        return false;
    }
}