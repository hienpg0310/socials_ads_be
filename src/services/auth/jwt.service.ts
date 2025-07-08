import jwt from 'jsonwebtoken';
import { v7 } from 'uuid';
import { appConfig } from '../../utils/config';
export class JWTService {
    constructor(private readonly secret: string) { }

    generateToken(payload: any, options: {
        expiredInSecs: number,
    }) {
        return jwt.sign(payload, this.secret, { jwtid: v7(), expiresIn: options.expiredInSecs })
    }

    verifyToken(token: string) {
        return jwt.verify(token, this.secret);
    }

    decodeToken(token: string) {
        return jwt.decode(token, { json: true });
    }

    getSecretKey() {
        return this.secret;
    }
}

export const appJwtService = new JWTService(appConfig.jwt.secret);