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


module.exports = {
    login
}