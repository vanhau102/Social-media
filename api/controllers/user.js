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
