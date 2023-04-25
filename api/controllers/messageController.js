import jwt from 'jsonwebtoken';
import moment from 'moment';
import { db } from "../config/db.js";

export const getMessages = (req, res) => {
    const receiverId = req.query.receiverId
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "select * from messages where (senderId = ? and receiverId = ? ) or (senderId = ? and receiverId = ? ) "


        db.query(q, [userInfo.id, receiverId, receiverId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            const result = data.map((data) => {
                return {
                    fromSelf: data.senderId === userInfo.id,
                    message: data.message
                }
            })
            return res.status(200).json(result);
        });
    });
}

export const addMessage = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "insert into messages (`message`, `receiverId`, `senderId`, `createdAt`) values (?) "

        const values = [
            req.body.message,
            req.body.receiverId,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Message has been created");
        });
    });
}