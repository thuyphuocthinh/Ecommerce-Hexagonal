import { ITokenProvider, TokenPayload } from "../interface";
import * as jwt from "jsonwebtoken";
import { config } from "./config";

class JwtTokenService implements ITokenProvider {
    private readonly secretKey: string;
    private readonly expiresIn: string | number;

    constructor(secretKey: string, expiresIn: string | number) {
        this.secretKey = secretKey;
        this.expiresIn = expiresIn;
    }

    async generateToken(payload: TokenPayload): Promise<string> {
        const token = jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
        return token;
    }

    async verifyToken(token: string): Promise<TokenPayload | null> {
        try {
            const decoded = jwt.verify(token, this.secretKey) as TokenPayload;
            return decoded;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
}

export const jwtProvider = new JwtTokenService(config.jwtConstants.secret, config.jwtConstants.expiresIn);