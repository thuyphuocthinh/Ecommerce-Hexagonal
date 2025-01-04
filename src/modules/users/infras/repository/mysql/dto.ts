import { DataTypes, Model, Sequelize } from "sequelize";
import { Gender, Role, Status } from "../../../model";

export class UserPersistence extends Model { }

export const modelName = "User";

export function init(sequelize: Sequelize) {
    UserPersistence.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: Role.USER,
        },
        gender: {
            type: DataTypes.ENUM,
            allowNull: true,
            defaultValue: Gender.UNKNOWN,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: Status.ACTIVE,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: modelName,
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    })
}
