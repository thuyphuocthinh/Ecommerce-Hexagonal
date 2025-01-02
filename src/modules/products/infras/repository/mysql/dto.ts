import { DataTypes, Model, Sequelize } from "sequelize";

export class ProductPersistence extends Model {
    declare id: string;
    declare status: string;
    declare name: string;
    declare image: string;
    declare description: string;
    declare price: number;
    declare brand_id: string;
    declare category_id: string;
    declare position: number;
    declare quantity: number;
    declare created_at: Date;
    declare updated_at: Date;
}

export class BrandPersistence extends Model {}

export class CategoryPersistence extends Model {}

export const modelNameOfProduct = "Product";
export const modelNameOfBrand = "Brand";
export const modelNameOfCategory = "Category";

export function init(sequelize: Sequelize) {
    ProductPersistence.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        brand_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
        sequelize,
        modelName: modelNameOfProduct,
        timestamps: true
    });

    BrandPersistence.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "brands",
        sequelize,
        modelName: modelNameOfBrand,
        timestamps: true
    });

    CategoryPersistence.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "categories",
        sequelize,
        modelName: modelNameOfCategory,
        timestamps: true
    });

    // => create relationship between tables
    // ProductPersistence.belongsTo(BrandPersistence, { foreignKey: { field: "brand_id"}, as: "brand" });
    // ProductPersistence.belongsTo(CategoryPersistence, { foreignKey: { field: "category_id"}, as: "category" });
}