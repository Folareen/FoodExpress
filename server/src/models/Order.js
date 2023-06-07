const { Schema, model } = require('mongoose')

const ItemSchema = new Schema({
    cover_img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
})

const OrderSchema = new Schema({
    date: {
        type: Date,
        default: new Date()
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    total: {
        type: Number,
        required: true
    },
    totalQty: {
        type: Number,
        required: true
    }
})

const Order = model('Order', OrderSchema)

module.exports = Order


// [
//     Object {
//         "cover_img": "https://cdn.sanity.io/images/c6ge8x6u/production/e16f1a940792caad36fce56edb7b67f90fe67352-1440x1920.jpg",
//         "price": 3500,
//         "quantity": 3,
//         "slug": "fried-rice",
//         "title": "Fried Rice",
//     },
//     Object {
//         "cover_img": "https://cdn.sanity.io/images/c6ge8x6u/production/bc026f92f0080f077827fc41db7ece6668eb7362-1920x1280.jpg",
//         "price": 5000,
//         "quantity": 2,
//         "slug": "veggie-mix",
//         "title": "Veggie Mix",
//     },
// ]