import jwt from "jsonwebtoken"
import { db } from "../config/db.js";

export const getLikes = (req, res) => {

    const q = `select likeUserId from likes where likePostId = ? `

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.likeUserId));
    })

};
export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "insert into likes (`likeUserId`, `likePostId`) values (?) "

        const values = [
            userInfo.id,
            req.body.postId,
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been like.");
        });
    });
}

export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "delete from likes where  `likeUserId` = ? and `likePostId` = ?"


        db.query(q, [userInfo.id, req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been disliked.");
        });
    });
}

