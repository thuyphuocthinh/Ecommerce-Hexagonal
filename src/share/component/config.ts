import dotenv from "dotenv";

dotenv.config();

export const config = {
    rpc: {
        brand: process.env.RPC_PRODUCT_BRAND_URL || "http://localhost:3000",
        category: process.env.RPC_PRODUCT_CATEGORY_URL || "http://localhost:3000"
    },
    mysql: {
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
    }
}