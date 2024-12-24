import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { Sequelize } from "sequelize";
import { MySQLBrandRepository } from "./infras/repository";
import { BrandUseCase } from "./usecase";
import { BrandHttpService } from "./infras/transport/http-service";



export const setUpBrandsHexagon = (sequelize: Sequelize) => {
    init(sequelize);

    const repository = new MySQLBrandRepository(sequelize);
    const useCase = new BrandUseCase(repository);
    const httpService = new BrandHttpService(useCase);

    const router = Router();

    router.get("/categories", httpService.listBrandsApi.bind(httpService));
    router.get("/categories/:id", httpService.deleteBrandApi.bind(httpService));
    router.post("/categories/create", httpService.createANewBrandAPI.bind(httpService));
    router.patch("/categories/:id", httpService.updateBrandApi.bind(httpService));
    router.delete("/categories/:id", httpService.deleteBrandApi.bind(httpService));

    return router;
}
