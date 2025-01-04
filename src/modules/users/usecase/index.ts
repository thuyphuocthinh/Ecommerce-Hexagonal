import { IRepository, ITokenProvider, UserRole } from "../../../share/interface";
import { I_paging_DTO } from "../../../share/model/paging";
import { IUserUseCase } from "../interface";
import { Gender, Role, Status, User, UserConditionDTO, UserLoginDTO, UserLoginDTOSchema, UserRegistrationDTO, UserRegistrationDTOSchema, UserUpdateDTO } from "../model";
import { v7 } from "uuid";
import { ErrEmailAlreadyExists, ErrInvalidCredentials, ErrUserNotActive } from "../model/error";
import bcrypt from "bcrypt";
import { generateRandomString } from "../../../share/utils";
import { ErrorDataNotFound } from "../../../share/model/base-error";
export class UserUseCase implements IUserUseCase {
    constructor(
        private readonly userRepository: IRepository<User, UserConditionDTO, UserUpdateDTO>,
        private readonly tokenService: ITokenProvider
    ) {}

    async profile(id: string): Promise<User> {
        const user = await this.userRepository.get(id);
        if(!user) {
            throw ErrorDataNotFound;
        }
        return user;
    }

    async login(data: UserLoginDTO): Promise<string> {
        const {success, data: parsedData, error} = UserLoginDTOSchema.safeParse(data);
        if (!success) throw new Error(error.message);
        const user = await this.userRepository.findByCondition({
            email: parsedData.email
        });
        // check email
        if(!user) {
            throw ErrInvalidCredentials;
        }
        // check password
        const isMatch = await bcrypt.compare(`${parsedData.password}.${user.salt}`, user.password);
        if(!isMatch) {
            throw ErrInvalidCredentials;
        }
        // check user status
        if(user.status === Status.INACTIVE || user.status === Status.BANNED) {
            throw ErrUserNotActive;
        }
        // generate token
        const role = user.role === Role.ADMIN ? UserRole.ADMIN : UserRole.USER;
        const token = this.tokenService.generateToken({ userId: user.id, role: role });
        return token;
    }

    async register(data: UserRegistrationDTO): Promise<string> {
        const {success, data: parsedData, error} = UserRegistrationDTOSchema.safeParse(data);
        if (!success) throw new Error("Invalid data");

        // 1. Check email already exists
        const existingUser = await this.userRepository.findByCondition({
            email: parsedData.email
        })

        if (existingUser) throw Error(ErrEmailAlreadyExists);

        // 2. Generate salt and hash password
        const salt = generateRandomString(16);
        const hashedPassword = await bcrypt.hash(`${parsedData.password}.${salt}`, 10);

        const newId: string = v7();
        const user: User = {
            ...parsedData,
            id: newId,
            salt: salt,
            password: hashedPassword,
            role: Role.USER,
            gender: Gender.MALE,
            phoneNumber: "",
            address: "",
            status: Status.ACTIVE,
            created_at: new Date(),
            updated_at: new Date(),
        }

        // insert user
        await this.userRepository.insert(user);
        // return user id is oke
        return newId;
    }

    async verifyToken(token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async create(data: UserRegistrationDTO): Promise<boolean | string> {
        return await this.register(data);
    }

    async update(id: string, data: UserUpdateDTO): Promise<boolean> {
        return await this.userRepository.update(id, data);
    }

    async delete(id: string, isHard: boolean): Promise<boolean> {
        return await this.userRepository.delete(id, isHard);
    }

    async get(id: string): Promise<User | null> {
        return await this.userRepository.get(id);
    }

    async list(condition: UserConditionDTO, paging: I_paging_DTO): Promise<Array<User>> {
        return await this.userRepository.list(condition, paging);
    }
}