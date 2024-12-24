import { I_paging_DTO } from './../../../share/model/paging';
import { I_categories_condition_DTO, I_categories_create_DTO, I_categories_update_DTO } from "../model/dto";
import { I_categories } from "../model/model";

export interface ICategoryUseCase {
    createANewCategory(data: I_categories_create_DTO): Promise<string>;
    updateCategory(id: string, data: I_categories_update_DTO): Promise<boolean>;
    deleteCategory(id: string): Promise<boolean>;
    listCategories(condition: I_categories_condition_DTO, paging: I_paging_DTO): Promise<Array<I_categories>>;
    detailCategory(id: string): Promise<I_categories | null>;
}

export interface IRepository extends IQueryRepository, ICommandRepository {}

export interface IQueryRepository {
    get(id: string): Promise<I_categories | null>;
    list(condition: I_categories_condition_DTO, paging: I_paging_DTO): Promise<Array<I_categories>>;
}

export interface ICommandRepository {
    insert(data: I_categories): Promise<boolean>;
    update(id: string, data: I_categories_update_DTO): Promise<boolean>;
    delete(id: string, isHard: boolean): Promise<boolean>;
}