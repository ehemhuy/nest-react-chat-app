import { SignOptions, JwtPayload, sign, verify } from 'jsonwebtoken'
export const generateJwtToken = (userID: string): string => {
    const payload = {
        userID
    }
    const options: SignOptions = {
        algorithm: 'HS256',
        expiresIn: '2h'
    }
    const jwtToken = sign(payload, process.env.JWT_SECRET_KEY, options)

    return jwtToken
}

export const verifyJwtToken = (token: string): JwtPayload => {
    let verifiedResult = verify(token, process.env.JWT_SECRET_KEY)
    if (typeof verifiedResult === 'string') {
        verifiedResult = {
            exp: Date.now()
        }
    }
    return verifiedResult
}