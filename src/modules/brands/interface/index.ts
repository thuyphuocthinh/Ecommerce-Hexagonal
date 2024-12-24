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

// for repository - data access layer - database
