"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailCategories = void 0;
const detailCategories = (categories) => {
    return (req, res) => {
        const category = categories.find(item => item.id === req.params.id);
        if (category) {
            return res.status(200).json({
                data: category
            });
        }
        return res.status(400).json({
            message: "Not Found"
        });
    };
};
exports.detailCategories = detailCategories;
