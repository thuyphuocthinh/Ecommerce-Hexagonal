import { v7 } from "uuid";
import { ICommandHandler } from "../../../share/interface";
import { CreateProductCommand, IProductRepository } from "../interface";
import { ProductCreateDTOSchema } from "../model/dto";
import { ErrorProductNameDuplicate } from "../model/errors";
import { Product } from "../model/product";
import { ModelStatus } from "../../../share/model/base-model";

export class CreateProductHandler implements ICommandHandler<CreateProductCommand, string> {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(cmd: CreateProductCommand): Promise<string> {
        const {data: parsedData, success, error} = ProductCreateDTOSchema.safeParse(cmd.cmd);
        if (!success) {
            throw new Error(error.message);
        }

        const isExist = await this.productRepository.findByCondition({name: parsedData.name});
        if (isExist) {
            throw ErrorProductNameDuplicate;
        }

        const product: Product = {
            id: v7(),
            name: parsedData.name,
            image: parsedData.image,
            description: parsedData.description,
            price: parsedData.price,
            brandId: parsedData.brandId,
            categoryId: parsedData.categoryId,
            status: ModelStatus.ACTIVE,
            created_at: new Date(),
            updated_at: new Date(),
        }

        await this.productRepository.insert(product);
        return product.id;
    }
}