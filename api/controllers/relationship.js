import jwt from "jsonwebtoken"
import { db } from "../config/db.js";

export const getRelationships = (req, res) => {

    const q = `select followerUserId from relationships where followedUserId = ? `

    db.query(q, [req.query.followerUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship => relationship.followerUserId));
    })

};
export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "insert into relationships (`followerUserId`, `followedUserId`) values (?) "

        const values = [
            userInfo.id,
            req.body.userId,
        ]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Relationship has been like.");
        });
    });
}

export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "delete from relationships where  `followerUserId` = ? and `followedUserId` = ?"


        db.query(q, [userInfo.id, req.query.followerUserId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Relationship has been disliked.");
        });
    });
}

