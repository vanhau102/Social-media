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


export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "update users set `name` = ? , `city`=? , `website`= ?, `profilePic`=? , `coverPic`= ? where id = ?"

        const values = [
            req.body.name,
            req.body.city,
            req.body.website,
            req.body.profilePic,
            req.body.coverPic,
            userInfo.id
        ]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.affectedRows > 0) return res.json("Updated!")
            return res.status(403).json("You can update only your post!")
        })
    })
}
