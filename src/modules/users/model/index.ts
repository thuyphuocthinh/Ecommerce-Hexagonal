import {z} from "zod";
import { ErrFirstNameAtLeast2Characters, ErrLastNameAtLeast2Characters, ErrEmailInvalid, ErrPasswordAtLeast8Characters, ErrRoleInvalid, ErrStatusInvalid, ErrGenderInvalid, ErrBirthDateInvalid, ErrPhoneNumberInvalid, ErrCountryInvalid, ErrStateInvalid, ErrCityInvalid, ErrAddressInvalid } from "./error";


export enum Gender {
    MALE = "male",
    FEMALE = "female",
    UNKNOWN = "unknown"
}

export enum Role {
    ADMIN = "admin",
    USER = "user"
}

export enum Status {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING = "pending",
    DELETED = "deleted",
    BANNED = "banned"
}

export const UserSchema = z.object({
    id: z.string().uuid(),
    firstName: z.string().min(2, ErrFirstNameAtLeast2Characters),
    lastName: z.string().min(2, ErrLastNameAtLeast2Characters),
    email: z.string().email(ErrEmailInvalid),
    password: z.string().min(8, ErrPasswordAtLeast8Characters),
    role: z.nativeEnum(Role),
    status: z.nativeEnum(Status),
    gender: z.nativeEnum(Gender),
    birthDate: z.string().datetime(ErrBirthDateInvalid).optional().nullable(),
    phoneNumber: z.string().min(10, ErrPhoneNumberInvalid),
    address: z.string().min(10, ErrAddressInvalid),
    salt: z.string().min(8),
    created_at: z.date(),
    updated_at: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const UserRegistrationDTOSchema = UserSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
});

export type UserRegistrationDTO = z.infer<typeof UserRegistrationDTOSchema>;

export const UserLoginDTOSchema = UserSchema.pick({
    email: true,
    password: true,
});

export type UserLoginDTO = z.infer<typeof UserLoginDTOSchema>;


export const UserUpdateDTOSchema = z.object({
    firstName: z.string().min(2, ErrFirstNameAtLeast2Characters).optional(),
    lastName: z.string().min(2, ErrLastNameAtLeast2Characters).optional(),
    password: z.string().min(8, ErrPasswordAtLeast8Characters).optional(),
    role: z.nativeEnum(Role).optional(),
    status: z.nativeEnum(Status).optional(),
    gender: z.nativeEnum(Gender).optional(),
    birthDate: z.string().datetime(ErrBirthDateInvalid).optional().nullable(),
    phoneNumber: z.string().min(10, ErrPhoneNumberInvalid).optional(),
    address: z.string().min(10, ErrAddressInvalid).optional(),
});
// Có cơ chế hide role và status => không thể để user cập nhật 2 field này dễ dàng

export type UserUpdateDTO = z.infer<typeof UserUpdateDTOSchema>;

export const UserConditionDTOSchema = z.object({
    id: z.string().uuid().optional(),
    email: z.string().email(ErrEmailInvalid).optional(),
    firstName: z.string().min(2, ErrFirstNameAtLeast2Characters).optional(),
    lastName: z.string().min(2, ErrLastNameAtLeast2Characters).optional(),
    phoneNumber: z.string().min(10, ErrPhoneNumberInvalid).optional(),
    address: z.string().min(10, ErrAddressInvalid).optional(),
    role: z.nativeEnum(Role).optional(),
    status: z.nativeEnum(Status).optional(),
    gender: z.nativeEnum(Gender).optional(),
});

export type UserConditionDTO = z.infer<typeof UserConditionDTOSchema>;
