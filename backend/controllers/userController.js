import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();

        res.json({ success: true, message: "User Registered Successfully!" });

    } catch (error) {
        res.status(500).json({ error: "Registration failed." });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: "7d" });
        res.json({ success: true, token });

    } catch (error) {
        res.status(500).json({ error: "Login failed." });
    }
};

