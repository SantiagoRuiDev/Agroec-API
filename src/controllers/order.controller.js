import * as orderModel from "../models/order.model.js";
import { v4 as uuidv4 } from "uuid";

export const getOrdersByUser = async (req, res) => {
    try {
        const user_id = req.user_id;

        const orders = await orderModel.getOrdersByUser(user_id);

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const getOrdersById = async (req, res) => {
    try {
        const order_id = req.params.id;

        const order = await orderModel.getOrdersById(order_id);

        return res.status(200).json(order);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
