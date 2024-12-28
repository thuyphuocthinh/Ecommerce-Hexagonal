import { IQueryHandler, IQueryRepository } from "../../../share/interface";
import { ErrorDataNotFound } from "../../../share/model/base-error";
import { GetDetailBrandQuery } from "../interface";
import { Brand } from "../model/brand";
import { BrandConditionDTO } from "../model/dto";

export class GetBrandDetailQueryHandler implements IQueryHandler<GetDetailBrandQuery, Brand | null> {
    constructor(private readonly repository: IQueryRepository<Brand, BrandConditionDTO>) {}
    async query(query: GetDetailBrandQuery): Promise<Brand | null> {
        const data = await this.repository.get(query.id);

        if(!data) {
            throw ErrorDataNotFound;
        }

        return data;
    }
}