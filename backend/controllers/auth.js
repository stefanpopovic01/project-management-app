const User = require("../models/User")
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken")

async function Register(req, res) {
    try {
        const user = new User(req.body);
        await user.save();

        const userObj = user.toObject();
        const { password, ...userWithoutPassword } = userObj;
    
        return res.status(201).json({ message: "User created!", user: userWithoutPassword });

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
};

async function Login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) return res.status(400).json({ message: "Email is required." });
        if (!password) return res.status(400).json({ message: "Password is required. " });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const match = await user.comparePassword(password);
        if (!match) return res.status(401).json({ message: "Wrong password." });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save()

        res.json({
            message: "Success login.",
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl,
                position: user.position,
                location: user.location
                },
        });
    

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { Register, Login };