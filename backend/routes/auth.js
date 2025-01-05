const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// admin secret key
const ADMIN_SECRET_KEY = "123";

router.post("/register", async (req, res) => {
    const { email, password, name, role, district, mobilenumber, empid, designation } = req.body;
    console.log(req.body);

    if (!email || !password || !name) {
        return res.status(400).send("All fields are required");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, name, role, district, mobilenumber, empid, designation });
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (err) {
        res.status(500).send("Error registering user: " + err.message);
    }
});

// Login endpoint
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid credentials");
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, role: user.role });

    } catch (err) {
        res.status(500).send("Error logging in: " + err.message);
    }
});

module.exports = router;
