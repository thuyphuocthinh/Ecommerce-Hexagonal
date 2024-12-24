import { v7 } from "uuid";
import { IRepository } from "../../../share/interface";
import { ModelStatus } from "../../../share/model/base-model";
import { I_paging_DTO } from "../../../share/model/paging";
import { IBrandUseCase } from "../interface";
import { Brand } from "../model/brand";
import { BrandConditionDTO, BrandCreateDTO, BrandCreateDTOSchema, BrandUpdateDTO, BrandUpdateDTOSchema } from "../model/dto";
import { ErrorBrandNameDuplicate } from "../model/errors";

export class BrandUseCase implements IBrandUseCase {
    constructor(private readonly repository: IRepository<Brand, BrandConditionDTO, BrandUpdateDTO>) {}

    async create(data: BrandCreateDTO): Promise<string> {
        const {success, data: parsedData, error} = BrandCreateDTOSchema.safeParse(data);
        if(!success) {
            throw new Error(error.message);
        }

        const isExist = await this.repository.findByCondition({name: parsedData.name});
        if(isExist) {
            throw ErrorBrandNameDuplicate;
        }

        const newId: string = v7();
        const brand: Brand = {
            id: newId,
            name: parsedData.name,
            image: parsedData.image,
            description: parsedData.description,
            status: ModelStatus.ACTIVE,
            created_at: new Date(),
            updated_at: new Date(),
        }
        await this.repository.insert(brand);
        return newId;
    }

    async update(id: string, data: BrandUpdateDTO): Promise<boolean> {
        const {success, data: parsedData, error} = BrandUpdateDTOSchema.safeParse(data);
        if(!success) {
            throw new Error(error.message);
        }
        return await this.repository.update(id, parsedData);
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id, false);
    }

    async list(condition: BrandConditionDTO, paging: I_paging_DTO): Promise<Array<Brand>> {
        return await this.repository.list(condition, paging);
    }

    async detail(id: string): Promise<Brand | null> {
        return await this.repository.get(id);
    }
}