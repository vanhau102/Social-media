import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

import router from "./router/index.js";

const app = express();


//Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//Router init
router(app);


app.listen(5000, () => {
    console.log("API working !");
})