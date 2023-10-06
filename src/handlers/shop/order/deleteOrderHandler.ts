import { OrderItem, Order } from "../../../db";
import ERROR_CODES from "../errorHandler";
import IResponse from "../interfaceResponse";

const moduleName = "deleteOrderItem";

const deleteOrderItem = async (email: string, orderId: number, deleteOnlyItems: boolean): Promise<IResponse> => {
    try {
        if (deleteOnlyItems) {
            await OrderItem.destroy({ where: { orderId } });
        } else {
            await Order.destroy({ where: { userEmail: email } });
        }

        return { isSuccess: true }

    } catch (error) {

        return {
            ...ERROR_CODES.CATCH_ERROR,
            error: (error as Error).message,
            modulo: moduleName
        }
    }
}

export default deleteOrderItem;