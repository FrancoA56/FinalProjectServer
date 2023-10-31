import { Interface } from "readline";
import { Order, OrderItem, Preset } from "../../../db";

interface IProduct {
    id?: number
}

const checkOrderItemExistence = async (email: string, presetId: IProduct) => {

    const findOrder = await Order.findOne({
        where: { userEmail: email },
        include: [{
            model: OrderItem,
            where: { presetId },
        }],
    })

    return { exist: findOrder ? true : false }
}

export default checkOrderItemExistence;