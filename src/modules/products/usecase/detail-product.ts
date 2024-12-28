import { IQueryHandler } from "../../../share/interface";
import { GetDetailProductQuery, IProductRepository } from "../interface";
import { Product } from "../model/product";

export class QueryDetailProductHandler implements IQueryHandler<GetDetailProductQuery, Product> {
    constructor(private readonly productRepository: IProductRepository) {}

    async query(query: GetDetailProductQuery): Promise<Product | null> {
        return await this.productRepository.get(query.id);
    }
}