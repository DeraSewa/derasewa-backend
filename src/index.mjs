import express from "express";
import "dotenv/config";

const app = express();

app.listen(process.env.PORT, ()=>{
    console.log(`DeraSewa server is listening on PORT ${process.env.PORT}`);
});
