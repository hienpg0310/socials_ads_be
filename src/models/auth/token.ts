export type TokenPayload = {
    jwtId: string,
    sub: string, // use userId for sub
}

export type RefreshTokenPayload = {
    // create from hash with token payload
    signature: string,
}