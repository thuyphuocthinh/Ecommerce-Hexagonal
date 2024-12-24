import {z} from "zod";
import { I_categories_condition_DTO_schema, I_categories_create_DTO_schema, I_categories_update_DTO_schema } from "./model";

export type I_categories_create_DTO = z.infer<typeof I_categories_create_DTO_schema>;
export type I_categories_update_DTO = z.infer<typeof I_categories_update_DTO_schema>;
export type I_categories_condition_DTO = z.infer<typeof I_categories_condition_DTO_schema>;