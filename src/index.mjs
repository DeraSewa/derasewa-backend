import express from "express";
import "dotenv/config";
import cors from "cors";

import router from "./routes/index.mjs";
import { connectMongoDB } from "./connections/index.mjs";

const PORT = process.env.SERVER_PORT || 8080; // Use hard coded PORT 8080 if intended PORT is unavailable
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/derasewa";

connectMongoDB(MONGODB_URL)

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`DeraSewa server is listening on PORT ${PORT}`);
});
