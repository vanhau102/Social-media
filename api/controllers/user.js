import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const getUser = (req, res) => {
    const userId = req.params.userId;

    const q = " select * from users where id = ?"

    db.query(q, [userId], (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        const { password, ...other } = data[0];
        return res.status(200).json(other);
    })
}
export const getUserFollower = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "select r.* , u.*from relationships as r join users  as u on(u.id = followedUserId) where followerUserId = ?"

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);

        });
    });

}


export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const qUpdate = "update users set `name` = ? , `city`=? , `website`= ?, `profilePic`=? , `coverPic`= ? where id = ?"

        const values = [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.profilePic,
            req.body.coverPic,
            userInfo.id
        ]

        db.query(qUpdate, values, (err, result) => {
            if (err) { return res.status(500).json(err); }
            if (result.affectedRows > 0) {
                const q = " select * from users where id = ?"
                db.query(q, [userInfo.id], (err, result) => {

                    return res.json(result)
                })
            }

        })
    })
}
