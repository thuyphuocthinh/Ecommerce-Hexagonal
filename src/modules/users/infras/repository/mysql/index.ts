import { User, UserConditionDTO, UserUpdateDTO } from "../../../model";
import { Sequelize } from "sequelize";
import { BaseQueryRepositorySequelize, BaseRepositorySequelize, BaseCommandRepositorySequelize } from "../../../../../share/repository/repo-sequelize";
import { modelName } from "./dto";

export class MySQLUserRepository extends BaseRepositorySequelize<User, UserConditionDTO, UserUpdateDTO> {
    constructor(sequelize: Sequelize, modelName: string) {
        super(sequelize, modelName);
    }
}

export class MySQLUserQueryRepository extends BaseQueryRepositorySequelize<User, UserConditionDTO> {
    constructor(sequelize: Sequelize, modelName: string) {
        super(sequelize, modelName);
    }
}

export class MySQLUserCommandRepository extends BaseCommandRepositorySequelize<User, UserUpdateDTO> {
    constructor(sequelize: Sequelize, modelName: string) {
        super(sequelize, modelName);
    }
}
