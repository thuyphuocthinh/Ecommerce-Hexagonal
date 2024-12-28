import { ProductUpdateDTO } from "../../model/dto";

import { Sequelize } from "sequelize";
import { BaseRepositorySequelize } from "../../../../share/repository/repo-sequelize";
import { Product } from "../../model/product";
import { ProductConditionDTO } from "../../model/dto";
import { modelName } from "./dto";

export class MySQLProductRepository extends BaseRepositorySequelize<Product, ProductConditionDTO, ProductUpdateDTO> {
    constructor(sequelize: Sequelize) {
        super(sequelize, modelName);
    }
}