import { createHash } from "crypto";
import { appJwtService } from "./jwt.service";
import { RefreshTokenPayload, TokenPayload } from "../../models/auth/token";
import { v7 } from "uuid";

function generateAccessToken(payload: TokenPayload) {
    return appJwtService.generateToken(payload, { expiredInSecs: 3600 }); // 1 hour
}

function generateRefreshToken(payload: RefreshTokenPayload) {
    return appJwtService.generateToken(payload, { expiredInSecs: 7 * 24 * 3600 }); // 7 days
}

function generatePairTokens(userId: string) {
    const tokenId = v7();
    const accessPayload: TokenPayload = {
        jwtId: tokenId,
        sub: userId,
    }

    const refreshPayload: RefreshTokenPayload = {
        signature: getSignature(tokenId, userId),
    }

    const accessToken = generateAccessToken(accessPayload); // 1 hour
    const refreshToken = generateRefreshToken(refreshPayload); //7 days
    return {
        accessToken,
        refreshToken,
    }
}
function getSignature(tokenId: string, userId: string) {
    const tokenHash = createHash('sha256');
    return tokenHash.update(`${tokenId}.${appJwtService.getSecretKey()}.${userId}`).digest().toString('hex');
}

function refreshToken(accessToken: string, refreshToken: string) {
    // verify outdated refresh token
    const refreshPayload = appJwtService.verifyToken(refreshToken) as RefreshTokenPayload;
    const accessPayload = appJwtService.decodeToken(accessToken) as TokenPayload;


    // verify signature is valid
    const signature = getSignature(accessPayload.jwtId, accessPayload.sub);
    if (signature !== refreshPayload.signature) {
        throw new Error('Invalid signature token');
    }

    return generatePairTokens(accessPayload.sub)

}
const AuthService = {
    generatePairTokens,
    refreshToken,
}
export default AuthService;