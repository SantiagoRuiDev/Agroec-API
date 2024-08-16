import jwt from 'jsonwebtoken';
import {APP_SETTINGS} from '../libs/config.js';


export const encodeToken = (uuid, expire) => {
    return jwt.sign({user: uuid}, APP_SETTINGS.secret_key, {expiresIn: expire})
}

export const decodeToken = (token) => {
    try {
        return jwt.verify(token, APP_SETTINGS.secret_key);
    } catch (error) {
        if(error instanceof Error){
            throw new Error('Invalid token or internal error: ' + error.message)
        }
    }
}