import { IRepository } from "../../../share/interface";
import { I_paging_DTO } from "../../../share/model/paging";
import { Brand } from "../model/brand";
import { BrandConditionDTO, BrandCreateDTO, BrandUpdateDTO } from "../model/dto";

// for use case - business logic layer - business logic
export interface IBrandUseCase {
    create(data: BrandCreateDTO): Promise<string>;
    update(id: string, data: BrandUpdateDTO): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    list(condition: BrandConditionDTO, paging: I_paging_DTO): Promise<Array<Brand>>;
    detail(id: string): Promise<Brand | null>;
}

export interface CreateCommand {
    cmd: BrandCreateDTO;
}

export interface GetDetailBrandQuery {
    id: string;
}

export interface ListBrandQuery {
    condition: BrandConditionDTO;
    paging: I_paging_DTO;
}

export interface UpdateCommand {
    id: string;
    data: BrandUpdateDTO;
}

export interface DeleteCommand {
    id: string;
    isHardDelete: boolean;
}

// for repository - data access layer - database
export interface IBrandRepository extends IRepository<Brand, BrandConditionDTO, BrandUpdateDTO> {}
