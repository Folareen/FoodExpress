const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name,  email, phoneNumber,  password, address } = req.body;

        if (!name || !email || !phoneNumber || !password || !address)  {
            return res.status(400).json({ message: `All fields are required!` })
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name,  email, phoneNumber,  password: hashedPassword, address })

        const token = jwt.sign({ _id: user._id, name,  email, phoneNumber, address }, process.env.JWT_SECRET);

        res.status(201).json({ message: 'Account created successfully', token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to signup' });
    }

}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: `Email and password are required!` })
        }

        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign({ _id: user._id, name : user.name,  email : user.email, phoneNumber : user.phoneNumber, address : user.address }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to login' });
    }
}


module.exports = {
    login,
    signup
}