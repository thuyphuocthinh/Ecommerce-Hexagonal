"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_api_1 = require("./infras/list-api");
const get_api_1 = require("./infras/get-api");
const create_api_1 = require("./infras/create-api");
const dto_1 = require("./infras/repository/dto");
const setUpCategoriesModule = (sequelize, categories) => {
    (0, dto_1.init)(sequelize);
    const router = (0, express_1.Router)();
    router.get("/categories", (0, list_api_1.listCategories)(categories));
    router.get("/categories/:id", (0, get_api_1.detailCategories)(categories));
    router.post("/categories/create", (0, create_api_1.createCategories)(categories));
    // router.patch("/categories/:id", updateCategories(categories));
    // router.delete("/categories/:id", deleteCategories(categories));
    return router;
};
exports.default = setUpCategoriesModule;
