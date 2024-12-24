import { ModelStatus } from './../../../share/model/base-model';
import {z} from "zod";

export enum CategoryStatus {
    active = "active",
    inactive = "inactive",
    deleted = "deleted",
}

export const I_categories_create_DTO_schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    image: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    parent_id: z.string().uuid().nullable().optional(),
});


export const I_categories_schema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    image: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    position: z.number().min(0, "Invalid position").optional().nullable(),
    parent_id: z.string().uuid().optional().nullable(),
    status: z.nativeEnum(ModelStatus),
    created_at: z.date(),
    updated_at: z.date(),
});

export const I_categories_update_DTO_schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100).optional().nullable(),
    image: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    parent_id: z.string().uuid().optional().nullable(),
    position: z.number().min(0, "Invalid position").optional().nullable(),
    status: z.nativeEnum(ModelStatus).optional().nullable(),
})

export const I_categories_condition_DTO_schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100).optional(),
    parent_id: z.string().uuid().optional(),
    status: z.nativeEnum(ModelStatus).optional(),
})

export type I_categories = z.infer<typeof I_categories_schema> & {children?: I_categories[]};