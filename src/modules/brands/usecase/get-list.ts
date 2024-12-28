import { IQueryHandler } from "../../../share/interface";
import { ErrorDataNotFound } from "../../../share/model/base-error";
import { IBrandRepository, ListBrandQuery } from "../interface";
import { Brand } from "../model/brand";

export class ListBrandQueryHandler implements IQueryHandler<ListBrandQuery, Array<Brand>> {
    constructor(private readonly repository: IBrandRepository) {}
    async query(query: ListBrandQuery): Promise<Array<Brand>> {
        const collection = await this.repository.list(query.condition, query.paging);
        return collection;
    }
}