import { Handler, NextFunction, Request, Response } from "express";
import { ITokenIntrospect, Requester } from "../interface";

export function authMiddleware(
    introspector: ITokenIntrospect
): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                res.status(401).json({
                    error: "Unauthorized"
                });
                return;
            }

            // provide an interface to verify token
            // whether how this interface is implemented depends on the service
            // this middleware is written in the microservices environment
            const { payload, isOk } = await introspector.introspect(token);
            if(!isOk) {
                res.status(401).json({
                    error: "Unauthorized"
                });
                return;
            }

            const requester = payload as Requester;
            res.locals["requester"] = requester;
            return next();
        } catch (error) {
            res.status(401).json({
                error: "Unauthorized"
            });
        }
    }
}