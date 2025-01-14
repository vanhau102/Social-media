import jwt from 'jsonwebtoken';
import moment from 'moment';

import { db } from "../config/db.js";

export const getComments = (req, res) => {

    const q = `SELECT c.*, u.id AS userId, name, profilePic 
    FROM comments AS c JOIN users AS u ON ( c.userId = u.id ) 
    where c.postId = ?
    ORDER BY c.createdAt DESC`
    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });

}

export const addComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "insert into comments (`desc`, `createdAt`, `userId`, `postId`) values (?) "

        const values = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId,
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created");
        });
    });
}
