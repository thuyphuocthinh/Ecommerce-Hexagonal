import { z } from "zod";
import { ModelStatus } from "../../../share/model/base-model";
import { ErrorProductNameTooLong, ErrorProductNameTooShort } from "./errors";

export const ProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, ErrorProductNameTooShort.message.toString()).max(100, ErrorProductNameTooLong.message.toString()),
    image: z.string(),
    description: z.string().optional().default(""),
    price: z.number(),
    brandId: z.string().uuid(),
    categoryId: z.string().uuid(),
    position: z.number().default(0).optional(),
    quantity: z.number().default(0).optional(),
    status: z.nativeEnum(ModelStatus),
    created_at: z.date(),
    updated_at: z.date(),
});

export type Product = z.infer<typeof ProductSchema>;
