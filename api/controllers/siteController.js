import { db } from "../config/db.js"

export const searchUser = (req, res) => {


    const q = " select * from users where name LIKE ?"
    const value = `%${req.query.value}%`
    db.query(q, [value], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })

}