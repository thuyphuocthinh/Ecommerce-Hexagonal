import { ICommandHandler } from "../../../share/interface";
import { DeleteProductCommand, IProductRepository } from "../interface";

export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand, boolean> {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(cmd: DeleteProductCommand): Promise<boolean> {
        return await this.productRepository.delete(cmd.id, cmd.isHardDelete);
    }
}   