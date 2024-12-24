import { DataTypes, Model, Sequelize } from "sequelize";

export class CategoryPersistence extends Model {
    declare id: string;
    declare status: string;
    declare name: string;
    declare image: string;
    declare description: string;
    declare parent_id: string;
    declare position: number;
    declare created_at: Date;
    declare updated_at: Date;
}

export const modelName = "Category";

export function init(sequelize: Sequelize) {
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
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parent_id: {
            type: DataTypes.UUID,
            allowNull: true,
            field: "parent_id",
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM("active", "inactive", "deleted"),
            allowNull: false,
            defaultValue: "active",
        }
    }, {
        sequelize,
        modelName,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "categories",
    })}