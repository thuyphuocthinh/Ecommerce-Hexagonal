import { I_paging_DTO } from "../model/paging";
import { CreateCommand, IUseCase } from "../usecase";
import { Request, Response } from "express";

export abstract class BaseHTTPService<T_create_DTO, T_update_DTO, Entity, T_condition_DTO> {
    constructor(readonly useCase: IUseCase<T_create_DTO, T_update_DTO, Entity, T_condition_DTO>) {
    }

    async createAPI(req: Request, res: Response) {
        const cmd: T_create_DTO = req.body;
        const result = await this.useCase.create(cmd);
        res.status(200).json({data: result});
    }

    async updateAPI(req: Request, res: Response) {
        const {id} = req.params;
        const cmd: T_update_DTO = req.body;
        const result = await this.useCase.update(id, cmd);
        res.status(200).json({data: result});
    }

    async deleteAPI(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.useCase.delete(id, req.body.isHardDelete);
        res.status(200).json({data: result});
    }

    async getDetailAPI(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.useCase.get(id);
        res.status(200).json({data: result});
    }

    async listAPI(req: Request, res: Response) {
        const condition: T_condition_DTO = req.body;
        const paging: I_paging_DTO = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10
        };
        const result = await this.useCase.list(condition, paging);
        res.status(200).json({data: result});
    }
}