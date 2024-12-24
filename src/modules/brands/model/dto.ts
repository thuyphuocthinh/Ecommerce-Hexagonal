import { z } from "zod";
import { ErrorBrandNameTooLong, ErrorBrandNameTooShort } from "./errors";
export const BrandCreateDTOSchema = z.object({
    name: z.string().min(2, ErrorBrandNameTooShort.message.toString()).max(100, ErrorBrandNameTooLong.message.toString()),
    image: z.string().optional().nullable(),
    tagLine: z.string().optional().nullable(), // motto of the brand
    description: z.string().optional().nullable(),
});

export const BrandUpdateDTOSchema = z.object({
    name: z.string().min(2, ErrorBrandNameTooShort.message.toString()).max(100, ErrorBrandNameTooLong.message.toString()),
    image: z.string().optional().nullable(),
    tagLine: z.string().optional().nullable(), // motto of the brand
    description: z.string().optional().nullable(),
});

export type BrandCreateDTO = z.infer<typeof BrandCreateDTOSchema>;
export type BrandUpdateDTO = z.infer<typeof BrandUpdateDTOSchema>;

export type BrandConditionDTO = {};

// schema is used to validate the data that is sent from the client
// DTO is used to define the structure of the data that is sent from the client
