import { Op } from "sequelize";
import { ModelStatus } from "../../../../share/model/base-model";
import { I_paging_DTO } from "../../../../share/model/paging";
import { IRepository } from "../../interface";
import { I_categories_condition_DTO, I_categories_update_DTO } from "../../model/dto";
import { I_categories, I_categories_schema } from "../../model/model";
import { Sequelize } from 'sequelize';

// implements for ORM here (Sequelize)
export class MYSQLCategoryRepository implements IRepository {
    constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {}
    async get(id: string): Promise<I_categories | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id);
        if(!data) {
            return null;
        }
        const persistentData = data.get({plain: true});
        // persistentData is stored in the database
        // so, we need to convert it to the format that is returned to the client
        return {
            ...persistentData,
            children: [],
            createdAt: persistentData.created_at.toISOString(),
            updatedAt: persistentData.updated_at.toISOString(),
        } as I_categories;
    }
    async list(condition: I_categories_condition_DTO, paging: I_paging_DTO): Promise<Array<I_categories>> {
        const query = this.sequelize.models[this.modelName].findAll({
            where: {...condition, status: {[Op.ne]: ModelStatus.DELETED}},
            order: [['position', 'ASC']],
            limit: paging.limit,
            offset: (paging.page - 1) * paging.limit,
        });
        const data = await query;
        return data.map(item => I_categories_schema.parse(item.get({plain: true})));
    }
    async insert(data: I_categories): Promise<boolean> {
        const result = await this.sequelize.models[this.modelName].create(data);
        return true;
    }
    async update(id: string, data: I_categories_update_DTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data, {where: {id: id}});
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

}