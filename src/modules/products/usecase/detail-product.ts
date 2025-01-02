import { IQueryHandler } from "../../../share/interface";
import { GetDetailQuery } from "../../../share/usecase";
import { GetDetailProductQuery, IProductBrandRepository, IProductCategoryRepository, IProductRepository } from "../interface";
import { Product } from "../model/product";

export class QueryDetailProductHandler implements IQueryHandler<GetDetailQuery<GetDetailProductQuery>, Product> {
    constructor(private readonly productRepository: IProductRepository,
        private readonly productBrandRepository: IProductBrandRepository,
        private readonly productCategoryRepository: IProductCategoryRepository
    ) {}

    // rpc in use case
    async query(query: GetDetailQuery<GetDetailProductQuery>): Promise<Product | null> {
        const product = await this.productRepository.get(query.id);
        if(!product) {
            return null;
        }

        const brand = await this.productBrandRepository.get(product.brandId);
        const category = await this.productCategoryRepository.get(product.categoryId);

        if(brand && category) {
            return {
                ...product,
                brand,
                category
            };
        }

        return null;
    }
}