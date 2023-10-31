import { OrderItem, Order } from "../../../db";

const deleteOrderItem = async (
    userEmail: string,
    presetId: number,
    orderId: number,
    deleteAllOrder: boolean
) => {

    if (!deleteAllOrder) {

        await OrderItem.destroy({
            where: { presetId, orderId }
        });

    } else {

        await Order.destroy({ where: { userEmail } });
    }

    return { isSuccess: true }

}

export default deleteOrderItem;