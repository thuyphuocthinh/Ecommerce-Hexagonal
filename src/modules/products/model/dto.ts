import { z } from "zod";
import { ErrorProductNameTooLong, ErrorProductNameTooShort } from "./errors";

export const ProductCreateDTOSchema = z.object({
    name: z.string().min(2, ErrorProductNameTooShort.message.toString()).max(100, ErrorProductNameTooLong.message.toString()),
    image: z.string().nullable(),
    description: z.string().optional().nullable(),
    price: z.number(),
    brandId: z.string().uuid(),
    categoryId: z.string().uuid()
});

export const ProductUpdateDTOSchema = z.object({
    name: z.string().min(2, ErrorProductNameTooShort.message.toString()).max(100, ErrorProductNameTooLong.message.toString()),
    image: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    price: z.number(),
    brandId: z.string().uuid(),
    categoryId: z.string().uuid()
});

export type ProductCreateDTO = z.infer<typeof ProductCreateDTOSchema>;
export type ProductUpdateDTO = z.infer<typeof ProductUpdateDTOSchema>;

export type ProductConditionDTO = {};
