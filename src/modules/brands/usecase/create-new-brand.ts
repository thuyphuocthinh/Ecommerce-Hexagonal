import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { CreateCommand, IBrandRepository } from "../../brands/interface";
import { Brand } from "../../brands/model/brand";
import { BrandCreateDTOSchema } from "../../brands/model/dto";
import { ErrorBrandNameDuplicate } from "../../brands/model/errors";
import { ICommandHandler } from "../../../share/interface";

export class CreateNewBrandCmdHandler implements ICommandHandler<CreateCommand, string> {
    constructor(private readonly repository: IBrandRepository) {}

    async execute(cmd: CreateCommand): Promise<string> {
        const {success, data: parsedData, error} = BrandCreateDTOSchema.safeParse(cmd.cmd);
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
}