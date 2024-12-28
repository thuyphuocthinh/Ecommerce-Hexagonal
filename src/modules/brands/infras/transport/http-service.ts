import { I_paging_DTO, I_paging_DTO_schema } from './../../../../share/model/paging';
import { BrandConditionDTO } from './../../model/dto';
import { Request, Response } from "express";
import { BrandUseCase } from "../../usecase";
import { CreateCommand, DeleteCommand, GetDetailBrandQuery, ListBrandQuery, UpdateCommand } from '../../interface';
import { Brand } from '../../model/brand';
import { ICommandHandler, IQueryHandler } from '../../../../share/interface';

export class BrandHttpService {
    constructor(
        private readonly createCmdHandler: ICommandHandler<CreateCommand, string>,
        private readonly getDetailQueryHandler: IQueryHandler<GetDetailBrandQuery, Brand | null>,
        private readonly updateCmdHandler: ICommandHandler<UpdateCommand, boolean>,
        private readonly deleteCmdHandler: ICommandHandler<DeleteCommand, boolean>,
        private readonly listQueryHandler: IQueryHandler<ListBrandQuery, Array<Brand>>
    ) {}

    async createANewBrandAPI(req: Request, res: Response) {
        try {
            const cmd: CreateCommand = {cmd: req.body};
            const result = await this.createCmdHandler.execute(cmd);
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
            const result = await this.getDetailQueryHandler.query({id});
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
            const cmd: UpdateCommand = {id, data: req.body};
            const result = await this.updateCmdHandler.execute(cmd);
            res.status(200).json({data: result});
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }

    async deleteBrandApi(req: Request, res: Response) {
        const {id} = req.params;
        const cmd: DeleteCommand = {id, isHardDelete: true};
        const result = await this.deleteCmdHandler.execute(cmd);
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
        const query: ListBrandQuery = {condition: {}, paging};
        const result = await this.listQueryHandler.query(query);
        res.status(200).json({data: result, paging: paging, filter: {}});
    }
}
