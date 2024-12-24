import { DataTypes, Model, Sequelize } from "sequelize";

export class BrandPersistence extends Model {
    declare id: string;
    declare status: string;
    declare name: string;
    declare image: string;
    declare description: string;
    declare tag_line: string;
    declare created_at: Date;
    declare updated_at: Date;
}

export const modelName = "Brand";

export function init(sequelize: Sequelize) {
    BrandPersistence.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
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
        tag_line: {
            type: DataTypes.STRING,
            field: "tag_line",
            allowNull: true,
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
        tableName: "brands",
    })}