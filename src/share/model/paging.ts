import {z} from "zod";

export const I_paging_DTO_schema = z.object({
    page: z.coerce.number().int().positive().min(1).default(1),
    limit: z.coerce.number().int().positive().min(1).max(50).default(10),
    total: z.coerce.number().int().positive().default(0).optional(),
})

export type I_paging_DTO = z.infer<typeof I_paging_DTO_schema>;