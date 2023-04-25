import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import multer from "multer";
import router from "./router/index.js";
import { Server } from "socket.io";

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

//Multer Upload file

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})
//Router init
router(app);


const server = app.listen(5000, () => {
    console.log("API working !");
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log('a user connected.');

    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        console.log(userId);
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(sendUserSocket);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});