import express from "express";
import bodyParser from "body-parser";

import homeRoutes from "./routes/home.routes";
import db from "./util/db";
import securitySetup from "./startup/security";

const app = express();

app.use(bodyParser.json()); // application/json

securitySetup(app);

//Routes
app.use("/", homeRoutes);

const APP_PORT = 8000;

app.listen(APP_PORT, () => {
  console.log("Server is running on port 8000");
});
