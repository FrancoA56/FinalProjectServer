import { Order } from "../../../db";
import findOrderByUser from "./findOrderByUser";
import addOrderItem from "./addOrderItemHandler";
import deleteOrderItem from "./deleteOrderHandler";
import ERROR_CODES from "../errorHandler";
import IResponse from "../interfaceResponse";


const moduleName = 'addOrderHandler';

interface IProduct {
    id?: number;
}

const addOrderHandler = async (
    email: string | undefined,
    products: IProduct[] | undefined,
): Promise<IResponse> => {

    if (!email || !products) {
        return { ...ERROR_CODES.INVALID_PARAM, modulo: moduleName };
    }
    try {

        const findResponse = await findOrderByUser(email);

        if (!findResponse.isSuccess) {
            const order = await Order.create({ userEmail: email });

            const addItems = await addOrderItem(order.dataValues.id, products);
            if (!addItems.isSuccess) return addItems;

        } else {

            await deleteOrderItem(email, findResponse.data[0].id, true);

            await addOrderItem(findResponse.data[0].id, products);
        }

        return { isSuccess: true };

    } catch (error) {
        return {
            ...ERROR_CODES.CATCH_ERROR,
            error: (error as Error).message,
            modulo: moduleName
        }
    }
};

export default addOrderHandler;