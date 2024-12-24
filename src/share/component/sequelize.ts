import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

export const sequelize = new Sequelize({
    database: process.env.DB_NAME || "",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "",
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT as string),
    logging: true,
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