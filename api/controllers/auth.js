import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    //Check users exits
    const q = "select * from users where username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (data.length) {
            return res.status(409).json("User already exists!")
        }
        // Create a new user
        //Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "insert into users (`username`, `email`, `password`, `name`) value (?)"
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name];
        db.query(q, [values], (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json("User has been create.");
        });

    })
}


export const login = (req, res) => {

    const q = "select * from users where username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length == 0) {
            return res.status(404).json("User not found.");
        }

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPassword) {
            return res.status(404).json("Wrong password or username");
        }

        const { password, ...others } = data[0];
        const token = jwt.sign({ id: data[0].id }, "secretKey");
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json({ ...others, token });
    })

}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")
}
