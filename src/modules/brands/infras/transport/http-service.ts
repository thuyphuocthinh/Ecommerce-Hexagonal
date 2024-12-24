import { I_paging_DTO, I_paging_DTO_schema } from './../../../../share/model/paging';
import { BrandConditionDTO } from './../../model/dto';
import { Request, Response } from "express";
import { BrandUseCase } from "../../usecase";

export class BrandHttpService {
    constructor(private readonly useCase: BrandUseCase) {}

    async createANewBrandAPI(req: Request, res: Response) {
        try {
            const result = await this.useCase.create(req.body);
            res.status(200).json({data: result});
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }

    async getDetailBrandAPI(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const result = await this.useCase.detail(id);
            res.status(200).json({data: result});
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }

    async updateBrandApi(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const result = await this.useCase.update(id, req.body);
            res.status(200).json({data: result});
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }

    async deleteBrandApi(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.useCase.delete(id);
        res.status(200).json({data: result});
    }

    async listBrandsApi(req: Request, res: Response) {
        const {success, data: paging, error} = I_paging_DTO_schema.safeParse(req.query);
        if(!success) {
            res.status(400).json({
                message: error.message
            });
            return;
        }
        const result = await this.useCase.list({}, paging);
        res.status(200).json({data: result, paging: paging, filter: {}});
    }
}
