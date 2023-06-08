const Order = require("../models/Order");
const jwt = require("jsonwebtoken")

const getOrderHistory = async (req, res) => {
    try {
        if (!req.headers.authorization) return res.status(401).json({ message: 'unauthorized' })
        const token = req.headers.authorization.split(' ')[1];
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedUser) return res.status(401).json({ message: 'unauthorized' })

        const orders = await Order.find({userId: decodedUser._id});

        console.log(orders, decodedUser._id)

        res.status(200).json({
            orders
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

const order = async (req, res) => {
    try {
        console.log(req.headers)
        if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' })
        const token = req.headers.authorization.split(' ')[1];
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedUser) return res.status(401).json({ message: 'Unauthorized' })

        const {items, total, totalQty} = req.body
        if(!items || !total) return res.status(400).json({message: 'Items and total is required!'})

        await Order.create({date: new Date(), items, userId: decodedUser._id, total, totalQty})

        res.status(201).json({message: 'Order completed successfully'})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Something went wrong' })
    }
}

module.exports = { getOrderHistory, order }
