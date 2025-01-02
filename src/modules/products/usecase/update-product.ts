import { ICommandHandler } from "../../../share/interface";
import { UpdateCommand } from "../../../share/usecase";
import { IProductRepository } from "../interface";
import { ProductUpdateDTO, ProductUpdateDTOSchema } from "../model/dto";
import { ErrorProductNotFound } from "../model/errors";

export class ProductUpdateHandler implements ICommandHandler<UpdateCommand<ProductUpdateDTO>, boolean> {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(cmd: UpdateCommand<ProductUpdateDTO>): Promise<boolean> {
        const {data: parsedData, success, error} = ProductUpdateDTOSchema.safeParse(cmd.data);
        if (!success) {
            throw new Error(error.message);
        }

        const product = await this.productRepository.get(cmd.id);
        if (!product) {
            throw ErrorProductNotFound;
        }

        return await this.productRepository.update(cmd.id, parsedData);
    }
}