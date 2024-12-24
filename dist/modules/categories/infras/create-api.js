"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategories = void 0;
const model_1 = require("../model/model");
const uuid_1 = require("uuid");
const createCategories = (categories) => {
    return (req, res) => {
        const { success, data, error } = model_1.I_categories_create_DTO_schema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                status: 400,
                message: error?.message || "Invalid data"
            });
        }
        const { name, image, description, parent_id } = data;
        const newId = (0, uuid_1.v7)();
        const newCategory = {
            name,
            image: image || null,
            description: description || null,
            id: newId,
            created_at: new Date(),
            updated_at: new Date(),
            parent_id: parent_id || null,
            position: 0,
            status: model_1.CategoryStatus.active
        };
        categories.push(newCategory);
        return res.status(201).json({
            data: newId
        });
    };
};
exports.createCategories = createCategories;
