import express, {Express} from "express";
import dotenv from "dotenv";

import { setUpCategoriesHexagon } from "./modules/categories";
import { sequelize } from "./share/component/sequelize";
import { setUpBrandsHexagon } from "./modules/brands";

dotenv.config();

// anonymous function ~ similar to java
(async () => {
const app: Express = express();
const PORT: number | string = process.env.PORT || 8000;

app.use(express.json());

sequelize.authenticate();
console.log("Connection has been established successfully");

app.use("/api/v1", setUpCategoriesHexagon(sequelize));
app.use("/api/v1", setUpBrandsHexagon(sequelize));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
})();

