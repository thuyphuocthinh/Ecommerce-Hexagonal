import { I_paging_DTO } from "../../../share/model/paging";
import { ProductConditionDTO, ProductCreateDTO, ProductUpdateDTO } from "../model/dto";
import { IRepository } from "../../../share/interface";
import { Product, ProductBrand, ProductCategory } from "../model/product";

export interface CreateProductCommand {
    cmd: ProductCreateDTO;
}

export interface GetDetailProductQuery {
    id: string;
}

export interface ListProductQuery {
    condition: ProductConditionDTO;
    paging: I_paging_DTO;
}

export interface UpdateProductCommand {
    id: string;
    data: ProductUpdateDTO;
}

export interface DeleteProductCommand {
    id: string;
    isHardDelete: boolean;
}

export interface IProductRepository extends IRepository<Product, ProductConditionDTO, ProductUpdateDTO> {}

export interface IProductBrandRepository {
    get(id: string): Promise<ProductBrand | null>;
}

export interface IProductCategoryRepository {
    get(id: string): Promise<ProductCategory | null>;
}
