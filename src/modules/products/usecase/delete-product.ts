import { ICommandHandler } from "../../../share/interface";
import { DeleteCommand } from "../../../share/usecase";
import { IProductRepository } from "../interface";

export class DeleteProductHandler implements ICommandHandler<DeleteCommand, boolean> {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(cmd: DeleteCommand): Promise<boolean> {
        return await this.productRepository.delete(cmd.id, cmd.isHardDelete);
    }
}