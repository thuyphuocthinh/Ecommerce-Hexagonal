import { I_paging_DTO } from "../model/paging";

export interface IRepository<Entity, Condition, UpdateDTO> extends IQueryRepository<Entity, Condition>, ICommandRepository<Entity, UpdateDTO> {}

export interface IQueryRepository<Entity, Condition> {
    get(id: string): Promise<Entity | null>;
    list(condition: Condition, paging: I_paging_DTO): Promise<Array<Entity>>;
    findByCondition(condition: Condition): Promise<Entity | null>;
}

export interface ICommandRepository<Entity, UpdateDTO> {
    insert(data: Entity): Promise<boolean>;
    update(id: string, data: UpdateDTO): Promise<boolean>;
    delete(id: string, isHard: boolean): Promise<boolean>;
}

export interface ICommandHandler<Cmd, Result> {
    execute(cmd: Cmd): Promise<Result>;
}
export interface IQueryHandler<Query, Result> {
    query(query: Query): Promise<Result | null>;
}
