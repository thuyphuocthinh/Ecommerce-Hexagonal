import { Router } from "express";
import { init, modelName } from "./infras/repository/dto";
import { Sequelize } from "sequelize";
import { MySQLBrandRepository } from "./infras/repository";
import { BrandUseCase } from "./usecase";
import { BrandHttpService } from "./infras/transport/http-service";
import { CreateNewBrandCmdHandler } from "../brands/usecase/create-new-brand";
import { GetBrandDetailQueryHandler } from "./usecase/get-brand-detail";
import { UpdateBrandCmdHandler } from "./usecase/update-brand";
import { DeleteBrandCmdHandler } from "./usecase/delete-brand";
import { ListBrandQueryHandler } from "./usecase/get-list";



export const setUpBrandsHexagon = (sequelize: Sequelize) => {
    init(sequelize);

    // inject dependencies - injection
    const repository = new MySQLBrandRepository(sequelize);
    const createCmdHandler = new CreateNewBrandCmdHandler(repository);
    const getDetailQueryHandler = new GetBrandDetailQueryHandler(repository);
    const updateCmdHandler = new UpdateBrandCmdHandler(repository);
    const deleteCmdHandler = new DeleteBrandCmdHandler(repository);
    const listQueryHandler = new ListBrandQueryHandler(repository);
    const httpService = new BrandHttpService(
        createCmdHandler,
        getDetailQueryHandler,
        updateCmdHandler,
        deleteCmdHandler,
        listQueryHandler
    );

    const router = Router();

    router.get("/categories", httpService.listBrandsApi.bind(httpService));
    router.get("/categories/:id", httpService.deleteBrandApi.bind(httpService));
    router.post("/categories/create", httpService.createANewBrandAPI.bind(httpService));
    router.patch("/categories/:id", httpService.updateBrandApi.bind(httpService));
    router.delete("/categories/:id", httpService.deleteBrandApi.bind(httpService));

    return router;
}
