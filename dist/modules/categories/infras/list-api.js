"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategories = void 0;
const listCategories = (categories) => {
    return (req, res) => {
        res.status(200).json({
            data: categories
        });
    };
};
exports.listCategories = listCategories;
