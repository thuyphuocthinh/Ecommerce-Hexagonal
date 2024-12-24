"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)();
exports.sequelize = new sequelize_1.Sequelize({
    database: process.env.DB_NAME || "",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "",
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT),
    logging: false,
    pool: {
        max: 20,
        min: 2,
        acquire: 30000,
        idle: 60000,
    }
    /**
     * connection pool
     * - pattern design database
     * - max number of connections concurrently
     * - min number of connections concurrently
     * - acquire tries to open a connection (timeout 30 to open a new connection)
     * - idle (time for an open connection to close)
     */
});
