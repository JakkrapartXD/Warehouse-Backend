import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const jwtGenerate = (user) => {
    const accessToken = jwt.sign(
        {name: user.name, id: user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1", algorithm: "HS256"}
    );

    return accessToken;
}

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    console.log(email);
    
    try {
        // Find user by username and password
        const user = await User.findOne({email, password});

        if (!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        // Generate JWT tokens
        const access_token = jwtGenerate(user);

        res.json({
            access_token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server error"});
    }
});

export default router;
