import jwt from 'jsonwebtoken';
import {APP_SETTINGS} from '../libs/config.js';


export const encodeToken = (uuid, profile_type, expire) => {
    return jwt.sign({user: uuid, profile: profile_type}, APP_SETTINGS.secret_key, {expiresIn: expire})
}

export const encodeMultiuserToken = (uuid, uuid_multi, expire) => {
    return jwt.sign({user: uuid, multiuser: uuid_multi}, APP_SETTINGS.secret_key, {expiresIn: expire})
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