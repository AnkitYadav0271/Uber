import express from "express";
import { configDotenv } from "dotenv";


configDotenv();
const PORT = process.env.PORT || 4000;
const app = express();


app.listen(PORT,()=>{
    console.log(`database is running at port:http://localhost:${PORT}`);
})