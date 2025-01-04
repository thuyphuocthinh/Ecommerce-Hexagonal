import { I_paging_DTO } from "../model/paging";

export interface CreateCommand<T> {
    cmd: T;
}

export interface UpdateCommand<T> {
    id: string;
    data: T;
}

export interface DeleteCommand {
    id: string;
    isHardDelete: boolean;
}

export interface GetDetailQuery<T> {
    id: string;
}

export interface ListQuery<T> {
    condition: T;
    paging: I_paging_DTO;
}

export interface IUseCase<T_create_DTO, T_update_DTO, Entity, T_condition_DTO> {
    create(data: T_create_DTO): Promise<boolean | string>;
    update(id: string, data: T_update_DTO): Promise<boolean>;
    delete(id: string, isHard: boolean): Promise<boolean>;
    get(id: string): Promise<Entity | null>;
    list(condition: T_condition_DTO, paging: I_paging_DTO): Promise<Array<Entity>>;
}