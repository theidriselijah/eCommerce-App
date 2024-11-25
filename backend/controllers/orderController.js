import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

// Placing order using COD method
const placeOrder = async (req, res) => {
    
    try {
        
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({ success: true, message: "Order Placed"})


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }

}

// Placing order using Stripe method 
const placeOrderStripe = async (req, res) => {

}

// Placing order using Razorpay method
const placeOrderRazorpay = async (req, res) => {

}

// User Orders data for Admin Panel
const allOrders = async (req, res) => {

}

// User Order Data for Frontend
const userOrders = async (req, res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update order status fro Admin Panel
const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}