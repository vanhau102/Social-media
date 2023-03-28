import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

import router from "./router/index.js";

const app = express();


//Middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", true);
    next();
})
app.use(express.json());


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(cookieParser());


//Router init
router(app);


app.listen(5000, () => {
    console.log("API working !");
})