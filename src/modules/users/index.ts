import { Router } from "express";
import { UserHTTPService } from "./infras/transport/http-service";
import { MySQLUserRepository } from "./infras/repository/mysql";
import { Sequelize } from "sequelize";
import { modelName } from "./infras/repository/mysql/dto";
import { UserUseCase } from "./usecase";
import { jwtProvider } from "../../share/component/jwt";

export const setUpUsersHexagon = (sequelize: Sequelize) => {
    const repository = new MySQLUserRepository(sequelize, modelName);
    const useCase = new UserUseCase(repository, jwtProvider);
    const httpService = new UserHTTPService(useCase);
    const router = Router();

    router.post("/users", httpService.createAPI.bind(httpService));
    router.get("/users/:id", httpService.getDetailAPI.bind(httpService));
    router.get("/users", httpService.listAPI.bind(httpService));
    router.patch("/users/:id", httpService.updateAPI.bind(httpService));
    router.delete("/users/:id", httpService.deleteAPI.bind(httpService));

    router.post("/auth/register", httpService.register.bind(httpService));
    router.post("/auth/login", httpService.login.bind(httpService));
    router.get("/profile", httpService.profile.bind(httpService));
    return router;
}