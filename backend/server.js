import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import newsRoutes from "./routes/newsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./config/connectDb.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    connectDb();
    console.log(`Server is listening on PORT: ${PORT}`);
})

