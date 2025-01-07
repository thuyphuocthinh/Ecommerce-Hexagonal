import { TokenPayload } from "../../../share/interface";
import { IUseCase } from "../../../share/usecase";
import { UserRegistrationDTO, UserUpdateDTO, User, UserConditionDTO, UserLoginDTO } from "../model";

export interface IUserUseCase extends IUseCase<UserRegistrationDTO, UserUpdateDTO, User, UserConditionDTO> {
    login(data: UserLoginDTO): Promise<string>;
    register(data: UserRegistrationDTO): Promise<string>;
    verifyToken(token: string): Promise<TokenPayload>;
    profile(id: string): Promise<User>;
}