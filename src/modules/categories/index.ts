import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { Sequelize } from "sequelize";
import { MYSQLCategoryRepository } from "./infras/repository/repo";
import { CategoryUseCase } from "./usecase";
import { CateogryHttpService } from "./infras/transport/http-service";



export const setUpCategoriesHexagon = (sequelize: Sequelize) => {
    init(sequelize);

    const repository = new MYSQLCategoryRepository(sequelize, modelName);
    const useCase = new CategoryUseCase(repository);
    const httpService = new CateogryHttpService(useCase);

    const router = Router();

    router.get("/categories", httpService.listCategoriesApi.bind(httpService));
    router.get("/categories/:id", httpService.getDetailCategoryAPI.bind(httpService));
    router.post("/categories/create", httpService.createANewCategoryAPI.bind(httpService));
    router.patch("/categories/:id", httpService.getDetailCategoryAPI.bind(httpService));
    router.delete("/categories/:id", httpService.deleteCategoryApi.bind(httpService));

    return router;
}
