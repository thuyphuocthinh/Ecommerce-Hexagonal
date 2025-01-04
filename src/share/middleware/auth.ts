import { Handler, Request, Response } from "express";
import { TokenIntrospectResult } from "../interface";

export function authMiddleware(
    introspector: TokenIntrospectResult
): Handler {
    return async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                res.status(401).json({
                    error: "Unauthorized"
                });
            }

            // const { payload, isOk } = introspector(token);
        } catch (error) {
            res.status(401).json({
                error: "Unauthorized"
            });
        }
    }
}