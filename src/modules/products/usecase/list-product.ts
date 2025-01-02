import { IQueryHandler } from "../../../share/interface";
import { ListQuery } from "../../../share/usecase";
import { ListProductQuery, IProductRepository } from "../interface";
import { Product } from "../model/product";

export class QueryListProductHandler implements IQueryHandler<ListQuery<ListProductQuery>, Array<Product>> {
    constructor(private readonly productRepository: IProductRepository) {}

    async query(query: ListProductQuery): Promise<Array<Product>> {
        return await this.productRepository.list(query.condition, query.paging);
    }
}