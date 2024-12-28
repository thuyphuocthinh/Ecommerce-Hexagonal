import { ICommandHandler } from "../../../share/interface";
import { ErrorDataNotFound } from "../../../share/model/base-error";
import { IBrandRepository, UpdateCommand } from "../interface";
import { BrandUpdateDTOSchema } from "../model/dto";

export class UpdateBrandCmdHandler implements ICommandHandler<UpdateCommand, boolean> {
    constructor(private readonly repository: IBrandRepository) {}
    async execute(cmd: UpdateCommand): Promise<boolean> {
        const {success, data: parsedData, error} = BrandUpdateDTOSchema.safeParse(cmd.data);
        if(!success) {
            throw new Error(error.message);
        }

        const brand = await this.repository.get(cmd.id);
        if(!brand) {
            throw ErrorDataNotFound;
        }

        return await this.repository.update(cmd.id, parsedData);
    }
}