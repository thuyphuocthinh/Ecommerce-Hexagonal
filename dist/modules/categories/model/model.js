"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I_categories_update_DTO_schema = exports.I_categories_schema = exports.I_categories_create_DTO_schema = exports.CategoryStatus = void 0;
const zod_1 = require("zod");
var CategoryStatus;
(function (CategoryStatus) {
    CategoryStatus["active"] = "active";
    CategoryStatus["inactive"] = "inactive";
    CategoryStatus["deleted"] = "deleted";
})(CategoryStatus || (exports.CategoryStatus = CategoryStatus = {}));
exports.I_categories_create_DTO_schema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters").max(100),
    image: zod_1.z.string().optional().nullable(),
    description: zod_1.z.string().optional().nullable(),
    parent_id: zod_1.z.string().uuid().nullable().optional(),
});
exports.I_categories_schema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(3, "Name must be at least 3 characters").max(100),
    image: zod_1.z.string().optional().nullable(),
    description: zod_1.z.string().optional().nullable(),
    position: zod_1.z.number().min(0, "Invalid position").optional().nullable(),
    parent_id: zod_1.z.string().uuid().optional().nullable(),
    status: zod_1.z.nativeEnum(CategoryStatus),
    created_at: zod_1.z.date(),
    updated_at: zod_1.z.date(),
});
exports.I_categories_update_DTO_schema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters").max(100).optional().nullable(),
    image: zod_1.z.string().optional().nullable(),
    description: zod_1.z.string().optional().nullable(),
    parent_id: zod_1.z.string().uuid().optional().nullable(),
    position: zod_1.z.number().min(0, "Invalid position").optional().nullable(),
    status: zod_1.z.nativeEnum(CategoryStatus).optional().nullable(),
});
