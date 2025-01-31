import { Role } from "../model/base-model";
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

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest'
}

export interface TokenPayload {
    userId: string;
    role: Role;
}

export interface Requester extends TokenPayload {}

export interface ITokenProvider {
    generateToken(payload: TokenPayload): Promise<string>;
    verifyToken(token: string): Promise<TokenPayload | null>;
}

export type TokenIntrospectResult = {
    payload: TokenPayload | null;
    error?: Error;
    isOk: boolean;
}

export interface ITokenIntrospect {
    introspect(token: string): Promise<TokenIntrospectResult>;
}
