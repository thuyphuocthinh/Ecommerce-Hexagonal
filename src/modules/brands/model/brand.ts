import { z } from "zod";
import { ModelStatus } from "../../../share/model/base-model";
import { ErrorBrandNameTooLong, ErrorBrandNameTooShort } from "./errors";

export const modelName: string = 'brands';

export const BrandSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, ErrorBrandNameTooShort.message.toString()).max(100, ErrorBrandNameTooLong.message.toString()),
    image: z.string().optional().nullable(),
    tagLine: z.string().optional().nullable(), // motto of the brand
    description: z.string().optional().nullable(),
    status: z.nativeEnum(ModelStatus),
    created_at: z.date(),
    updated_at: z.date(),
});

export type Brand = z.infer<typeof BrandSchema>;
