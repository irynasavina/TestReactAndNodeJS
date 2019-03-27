import Ajax from '../utils/ajax';
import Cookies from 'universal-cookie';

export default class Roles {
    static getRoles = async () => {
        const cookies = new Cookies();
        let sessionID = cookies.get('sessionID');
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