import { db } from "../config/db.js"
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = `select  p.*, u.id as userId , name, profilePic , followedUserId from posts as p 
        left join users as u on (u.id = p.userId) join relationships as r on ( p.userId = r.followerUserId) 
        where r.followedUserId = ? or p.userId = ? order by p.createdAt  desc`
        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "insert into posts (`desc`, `img`, `createdAt`, `userId`) values (?) "

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DDT HH:mm:ss"),
            userInfo.id
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created");
        });
    });
}
