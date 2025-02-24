const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('Request body:', req.body);

        const user = await UserModel.findOne({ email });
        if (user) {
            console.log('User already exists:', email);
            return res.status(409).json({ error: 'User already exists', success: false });
        }

        const newUser = new UserModel({ name, email, password });
        console.log('New user before hashing password:', newUser);

        newUser.password = await bcrypt.hash(password, 10);
        console.log('New user after hashing password:', newUser);

        await newUser.save();
        console.log('User created successfully:', newUser);

        res.status(201).json({ message: 'User created successfully', success: true });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Request body:', req.body);
        const errorMsg = 'Invalid email or password';
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ error: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ error: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'User logged in successfully',
            success: true,
            token: jwtToken,
            email,
            name: user.name
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    signup,
    login
};
