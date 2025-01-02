import { IQueryHandler } from "../../../../share/interface";
import { DeleteProductCommand, ListProductQuery, UpdateProductCommand, GetDetailProductQuery, CreateProductCommand, IProductCategoryRepository } from "../../interface";
import { ICommandHandler } from "../../../../share/interface";
import { Product } from "../../model/product";
import { Request, Response } from "express";
import { I_paging_DTO_schema } from "../../../../share/model/paging";
import { RPCProductBrandRepository } from "../repository/rpc";
import { config } from "../../../../share/component/config";
import { IProductBrandRepository } from "../../interface";
export class ProductHttpService {
    constructor(
        private readonly createCmdHandler: ICommandHandler<CreateProductCommand, string>,
        private readonly getDetailQueryHandler: IQueryHandler<GetDetailProductQuery, Product | null>,
        private readonly updateCmdHandler: ICommandHandler<UpdateProductCommand, boolean>,
        private readonly deleteCmdHandler: ICommandHandler<DeleteProductCommand, boolean>,
        private readonly listQueryHandler: IQueryHandler<ListProductQuery, Array<Product>>,
        private readonly productBrandRepository: IProductBrandRepository,
        private readonly productCategoryRepository: IProductCategoryRepository
    ) {}

    async createANewProductAPI(req: Request, res: Response) {
        try {
            const cmd: CreateProductCommand = {cmd: req.body};
            const result = await this.createCmdHandler.execute(cmd);
            res.status(200).json({data: result});
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }

    async getDetailProductAPI(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const result = await this.getDetailQueryHandler.query({id});
            const brand = await this.productBrandRepository.get(result!.brandId);
            const category = await this.productCategoryRepository.get(result!.categoryId);
            if(brand) {
                result!.brand = brand!;
            }
            if(category) {
                result!.category = category!;
            }
            res.status(200).json({data: result});
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }

    async updateProductAPI(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const cmd: UpdateProductCommand = {id, data: req.body};
            const result = await this.updateCmdHandler.execute(cmd);
            res.status(200).json({data: result});
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }

    async deleteProductAPI(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const cmd: DeleteProductCommand = {id, isHardDelete: true};
            const result = await this.deleteCmdHandler.execute(cmd);
            res.status(200).json({data: result});
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }

    async listProductAPI(req: Request, res: Response) {
        try {
            const {success, data: paging, error} = I_paging_DTO_schema.safeParse(req.query);
            if(!success) {
                res.status(400).json({
                    message: error.message
                });
                return;
            }
            const query: ListProductQuery = {condition: {}, paging};
            const result = await this.listQueryHandler.query(query);
            res.status(200).json({data: result, paging: paging, filter: {}});
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }
}