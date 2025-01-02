import { Sequelize } from "sequelize";
import { IQueryRepository, IRepository, ICommandRepository } from "../interface";
import { I_paging_DTO } from "../model/paging";
import { Op } from "sequelize";
import { ModelStatus } from "../model/base-model";


// implements for ORM here (Sequelize)
export abstract class BaseRepositorySequelize<Entity, Condition, UpdateDTO> implements IRepository<Entity, Condition, UpdateDTO> {
    constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {}
    async get(id: string): Promise<Entity | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id);
        if(!data) {
            return null;
        }
        const persistentData = data.get({plain: true});
        return {
            ...persistentData,
            createdAt: persistentData.created_at.toISOString(),
            updatedAt: persistentData.updated_at.toISOString(),
        } as Entity;
    }
    async list(condition: Condition, paging: I_paging_DTO): Promise<Array<Entity>> {
        const {page, limit} = paging;
        const condSQL = {
            ...condition,
            status: {[Op.ne]: ModelStatus.DELETED},
        }
        const total = await this.sequelize.models[this.modelName].count({where: condSQL});
        paging.total = total;
        const rows = await this.sequelize.models[this.modelName].findAll({
            where: condSQL,
            limit: limit,
            offset: (page - 1) * limit,
        });
        return rows.map(item => item.get({plain: true})) as Array<Entity>;
    }
    async insert(data: Entity): Promise<boolean> {
        const result = await this.sequelize.models[this.modelName].create(data as any);
        return true;
    }
    async update(id: string, data: UpdateDTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data as any, {where: {id: id}});
        return true;
    }
    async delete(id: string, isHard: boolean = false): Promise<boolean> {
        if(isHard) {
            await this.sequelize.models[this.modelName].destroy({where: {id: id}});
        } else {
            await this.sequelize.models[this.modelName].update({status: ModelStatus.INACTIVE}, {where: {id: id}});
        }
        return true;
    }
    async findByCondition(condition: Condition): Promise<Entity | null> {
        const data = await this.sequelize.models[this.modelName].findOne({where: condition as any});
        if(!data) {
            return null;
        }
        return data.get({plain: true}) as Entity;
    }
}

export abstract class BaseQueryRepositorySequelize<Entity, Condition> implements IQueryRepository<Entity, Condition> {
    constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {}
    async get(id: string): Promise<Entity | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id, {
            include: [
                {
                    model: this.sequelize.models["ProductCategory"],
                    as: "category",
                },
                {
                    model: this.sequelize.models["ProductBrand"],
                    as: "brand",
                }
            ]
        });
        if(!data) {
            return null;
        }
        return data.get({plain: true}) as Entity;
    }

    async list(condition: Condition, paging: I_paging_DTO): Promise<Array<Entity>> {
        const {page, limit} = paging;
        const condSQL = {
            ...condition,
            status: {[Op.ne]: ModelStatus.DELETED},
        }
        const total = await this.sequelize.models[this.modelName].count({where: condSQL});
        paging.total = total;
        const rows = await this.sequelize.models[this.modelName].findAll({
            where: condSQL,
            limit: limit,
            offset: (page - 1) * limit,
        });
        return rows.map(item => item.get({plain: true})) as Array<Entity>;
    }

    async findByCondition(condition: Condition): Promise<Entity | null> {
        const data = await this.sequelize.models[this.modelName].findOne({where: condition as any});
        if(!data) {
            return null;
        }
        return data.get({plain: true}) as Entity;
    }
}

export abstract class BaseCommandRepositorySequelize<Entity, UpdateDTO> implements ICommandRepository<Entity, UpdateDTO> {
    constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {}

    async insert(data: Entity): Promise<boolean> {
        await this.sequelize.models[this.modelName].create(data as any);
        return true;
    }

    async update(id: string, data: UpdateDTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data as any, {where: {id: id}});
        return true;
    }

    async delete(id: string, isHard: boolean): Promise<boolean> {
        if(isHard) {
            await this.sequelize.models[this.modelName].destroy({where: {id: id}});
        } else {
            await this.sequelize.models[this.modelName].update({status: ModelStatus.INACTIVE}, {where: {id: id}});
        }
        return true;
    }
}

