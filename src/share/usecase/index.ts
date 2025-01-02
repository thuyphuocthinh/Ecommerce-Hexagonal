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
