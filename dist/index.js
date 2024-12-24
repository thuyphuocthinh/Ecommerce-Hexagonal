"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const model_1 = require("./modules/categories/model/model");
const categories_1 = __importDefault(require("./modules/categories"));
const sequelize_1 = require("./share/component/sequelize");
dotenv_1.default.config();
exports.categories = [{
        id: "0193b10e-040d-7a57-937c-29c0b38446ba",
        name: "Category 1",
        image: 'image1.jpg',
        description: "Description 1",
        position: 0,
        parent_id: null,
        status: model_1.CategoryStatus.active,
        created_at: new Date(),
        updated_at: new Date()
    }];
(async () => {
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 8000;
    app.use(express_1.default.json());
    // anonymous function ~ similar to java
    sequelize_1.sequelize.authenticate();
    console.log("Connection has been established successfully");
    app.use("/api/v1", (0, categories_1.default)(sequelize_1.sequelize, exports.categories));
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
})();
