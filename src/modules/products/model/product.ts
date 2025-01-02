import { z } from "zod";
import { ModelStatus } from "../../../share/model/base-model";
import { ErrorProductNameTooLong, ErrorProductNameTooShort, ErrorBrandMustBeValidUUID, ErrorCategoryMustBeValidUUID, ErrorCategoryNameTooShort } from "./errors";
import { ErrorBrandNameTooShort } from "../../brands/model/errors";

export const ProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, ErrorProductNameTooShort.message.toString()).max(100, ErrorProductNameTooLong.message.toString()),
    image: z.string(),
    description: z.string().optional().default(""),
    price: z.number(),
    brandId: z.string().uuid(ErrorBrandMustBeValidUUID.message.toString()),
    categoryId: z.string().uuid(ErrorCategoryMustBeValidUUID.message.toString()),
    position: z.number().default(0).optional(),
    quantity: z.number().default(0).optional(),
    status: z.nativeEnum(ModelStatus),
    created_at: z.date(),
    updated_at: z.date(),
});

export type Product = z.infer<typeof ProductSchema> & {category?: ProductCategory, brand?: ProductBrand};

export const ProductBrandSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, ErrorBrandNameTooShort.message.toString()),
});

export type ProductBrand = z.infer<typeof ProductBrandSchema>;

export const ProductCategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, ErrorCategoryNameTooShort.message.toString()),
});

export type ProductCategory = z.infer<typeof ProductCategorySchema>;

// GRPC in controller, usecase, repository
