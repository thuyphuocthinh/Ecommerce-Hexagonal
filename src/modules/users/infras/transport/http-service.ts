import { BaseHTTPService } from "../../../../share/transport/base-httpservice";
import { User, UserConditionDTO, UserRegistrationDTO, UserUpdateDTO } from "../../model";
import { IUserUseCase } from "../../interface";
import { Request, Response } from "express";

export class UserHTTPService extends BaseHTTPService<UserRegistrationDTO, UserUpdateDTO, User, UserConditionDTO> {
    constructor(readonly useCase: IUserUseCase) {
        super(useCase);
    }

    async register(req: Request, res: Response) {
        try {
            await this.createAPI(req, res);
        } catch (err) {
            throw err;
        }
    }

    async login(req: Request, res: Response) {
        try {

            const {email, password} = req.body;
            const token = await this.useCase.login({email, password});
            res.status(200).json({data: token});
        } catch (err) {
            res.status(400).json({data: (err as Error).message});
        }
    }

    async verifyToken(req: Request, res: Response) {
       try {
            const {token} = req.query;
            const isVerified = await this.useCase.verifyToken(token as string);
            res.status(200).json({data: isVerified});
       } catch (err) {
            res.status(400).json({data: (err as Error).message});
       }
    }

    async profile(req: Request, res: Response) {
        try {
            // get token from middleware
            // get id from decoded token
            // get user
            const {id} = req.params;
            const user = await this.useCase.profile(id);
            const {salt, password, ...others} = user;
            res.status(200).json({data: others});
        } catch (err) {
            res.status(400).json({data: (err as Error).message});
        }
    }

    // this is an API for RPC
    async introspectAPI(req: Request, res: Response) {
        try {
            const {token} = req.body;
            const result = await this.useCase.verifyToken(token);
            res.status(200).json({data: result});
        } catch (err) {
            res.status(400).json({data: (err as Error).message});
        }
    }
}