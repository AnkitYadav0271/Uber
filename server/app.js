import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import connectToDB from "./db/db.js";
import userRoute from "./routes/user.routes.js";
import { globalErrorHandler } from "./middleware/global.error.handler.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users/", userRoute);



app.use(globalErrorHandler);
app.listen(PORT, () => {
  connectToDB();
  console.log(`database is running at port:http://localhost:${PORT}`);
});
