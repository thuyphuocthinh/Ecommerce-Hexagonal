import { ICategoryUseCase } from './../interface/index';
import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { IRepository } from "../interface";
import { I_categories_condition_DTO, I_categories_create_DTO, I_categories_update_DTO } from "../model/dto";
import { I_categories } from "../model/model";
import { I_paging_DTO } from '../../../share/model/paging';
import { ErrorDataNotFound } from '../../../share/model/base-error';

export class CategoryUseCase implements ICategoryUseCase {
    constructor(private readonly repository: IRepository) { }
    async updateCategory(id: string, data: I_categories_update_DTO): Promise<boolean> {
        const category = await this.repository.get(id);

        if(!category || category.status === ModelStatus.DELETED) {
            throw ErrorDataNotFound;
        }

        return await this.repository.update(id, data);
    }
    async deleteCategory(id: string): Promise<boolean> {
        const category = await this.repository.get(id);

        if(!category || category.status === ModelStatus.DELETED) {
            throw ErrorDataNotFound;
        }

        const isHard: boolean = true;

        return await this.repository.delete(id, isHard);
    }
    async listCategories(condition: I_categories_condition_DTO, paging: I_paging_DTO): Promise<Array<I_categories>> {
        const data = await this.repository.list(condition, paging);
        return data;
    }
    async detailCategory(id: string): Promise<I_categories | null> {
        const data = await this.repository.get(id);
        if(!data || data.status === ModelStatus.DELETED) {
            throw ErrorDataNotFound;
        }
        return data;
    }

    async createANewCategory(data: I_categories_create_DTO): Promise<string> {
        const newId: string = v7();
        const category: I_categories = {
            id: newId,
            name: data.name,
            image: data.image,
            description: data.description,
            created_at: new Date(),
            updated_at: new Date(),
            status: ModelStatus.ACTIVE,
            position: 0,
        }
        await this.repository.insert(category);
        return newId;
    }
}