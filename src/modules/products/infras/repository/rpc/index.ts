import axios from "axios";
import { IProductBrandRepository, IProductCategoryRepository } from "../../../interface";
import { ProductBrand, ProductBrandSchema, ProductCategory, ProductCategorySchema } from "../../../model/product";

export class RPCProductBrandRepository implements IProductBrandRepository {
    constructor(private readonly baseUrl: string) {}

    async get(id: string): Promise<ProductBrand | null> {
        try {
            const {data} = await axios.get(`${this.baseUrl}/v1/brands/${id}`);
            const brand = ProductBrandSchema.parse(data);
            return brand;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

// rpc is a way to communicate between services (in microservices architecture)
export class RPCProductCategoryRepository implements IProductCategoryRepository {
    constructor(private readonly baseUrl: string) {}

    async get(id: string): Promise<ProductCategory | null> {
        try {
            const {data} = await axios.get(`${this.baseUrl}/v1/categories/${id}`);
            const category = ProductCategorySchema.parse(data);
            return category;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

// proxy pattern
export class RPCProxyBrandRepository implements IProductBrandRepository {
    // pass redis cache here to the constructor if you want to use it
    constructor(private readonly origin: IProductBrandRepository) {}

    private cached: Record<string, ProductBrand> = {};

    async get(id: string): Promise<ProductBrand | null> {
        try {
            if(this.cached[id]) {
                return this.cached[id];
            }
            const brand = await this.origin.get(id);
            if(brand) {
                this.cached[id] = brand;
            }
            return brand;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export class RPCProxyCategoryRepository implements IProductCategoryRepository {
    constructor(private readonly origin: IProductCategoryRepository) {}

    private cached: Record<string, ProductCategory> = {};

    async get(id: string): Promise<ProductCategory | null> {
        try {
            if(this.cached[id]) {
                return this.cached[id];
            }
            const category = await this.origin.get(id);
            if(category) {
                this.cached[id] = category;
            }
            return category;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
