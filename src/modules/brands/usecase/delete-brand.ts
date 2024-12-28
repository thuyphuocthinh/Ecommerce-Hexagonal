import { ICommandHandler } from "../../../share/interface";
import { ErrorDataNotFound } from "../../../share/model/base-error";
import { DeleteCommand, IBrandRepository } from "../interface";

export class DeleteBrandCmdHandler implements ICommandHandler<DeleteCommand, boolean> {
    constructor(private readonly repository: IBrandRepository) {}
    async execute(cmd: DeleteCommand): Promise<boolean> {
        const brand = await this.repository.get(cmd.id);
        if(!brand) {
            throw ErrorDataNotFound;
        }
        return await this.repository.delete(cmd.id, cmd.isHardDelete);
    }
}