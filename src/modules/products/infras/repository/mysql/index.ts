import { ProductCategoryConditionDTO, ProductBrandConditionDTO, ProductUpdateDTO } from "../../../model/dto";

import { Sequelize } from "sequelize";
import { BaseRepositorySequelize } from "../../../../../share/repository/repo-sequelize";
import { Product, ProductBrand, ProductCategory } from "../../../model/product";
import { ProductConditionDTO } from "../../../model/dto";
import { modelNameOfProduct, modelNameOfBrand, modelNameOfCategory } from "./dto";
import { BaseQueryRepositorySequelize } from "../../../../../share/repository/repo-sequelize";

export class MySQLProductRepository extends BaseRepositorySequelize<Product, ProductConditionDTO, ProductUpdateDTO> {
    constructor(sequelize: Sequelize) {
        super(sequelize, modelNameOfProduct);
    }
}

export class MySQLBrandQueryRepository extends BaseQueryRepositorySequelize<ProductBrand, ProductBrandConditionDTO> {
    constructor(sequelize: Sequelize) {
        super(sequelize, modelNameOfBrand);
    }
}

export class MySQLCategoryQueryRepository extends BaseQueryRepositorySequelize<ProductCategory, ProductCategoryConditionDTO> {
    constructor(sequelize: Sequelize) {
        super(sequelize, modelNameOfCategory);
    }
}
