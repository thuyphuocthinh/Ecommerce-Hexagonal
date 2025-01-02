import { Sequelize } from "sequelize";
import { init } from "./infras/repository/mysql/dto";
import { MySQLProductRepository } from "./infras/repository/mysql";
import { ProductHttpService } from "./infras/transport/http-service";
import { Router } from "express";
import { CreateProductHandler } from "./usecase/create-product";
import { QueryDetailProductHandler } from "./usecase/detail-product";
import { ProductUpdateHandler } from "./usecase/update-product";
import { DeleteProductHandler    } from "./usecase/delete-product";
import { QueryListProductHandler } from "./usecase/list-product";
import { RPCProductBrandRepository, RPCProductCategoryRepository, RPCProxyBrandRepository, RPCProxyCategoryRepository } from "./infras/repository/rpc";
import { config } from "../../share/component/config";

export const setUpProductsHexagon = (sequelize: Sequelize) => {
    init(sequelize);

    // inject dependencies - injection
    const repository = new MySQLProductRepository(sequelize);
    const createCmdHandler = new CreateProductHandler(repository);
    const productBrandRepository = new RPCProxyBrandRepository(new RPCProductBrandRepository(config.rpc.brand));
    const productCategoryRepository = new RPCProxyCategoryRepository(new RPCProductCategoryRepository(config.rpc.category));
    const getDetailQueryHandler = new QueryDetailProductHandler(repository, productBrandRepository, productCategoryRepository);
    const updateCmdHandler = new ProductUpdateHandler(repository);
    const deleteCmdHandler = new DeleteProductHandler(repository);
    const listQueryHandler = new QueryListProductHandler(repository);
    const httpService = new ProductHttpService(
        createCmdHandler,
        getDetailQueryHandler,
        updateCmdHandler,
        deleteCmdHandler,
        listQueryHandler,
        productBrandRepository,
        productCategoryRepository
    );
    const router = Router();

    router.get("/products", httpService.listProductAPI.bind(httpService));
    router.get("/products/:id", httpService.getDetailProductAPI.bind(httpService));
    router.post("/products/create", httpService.createANewProductAPI.bind(httpService));
    router.patch("/products/:id", httpService.updateProductAPI.bind(httpService));
    router.delete("/products/:id", httpService.deleteProductAPI.bind(httpService));

    return router;
}