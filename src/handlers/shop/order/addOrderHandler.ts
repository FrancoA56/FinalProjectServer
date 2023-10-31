import { Order } from "../../../db";
import findOrderByEmail from "./getOrderByEmailHandler";
import addOrderItem from "./addOrderItemHandler";
import checkItem from "./checkOrderItemExistence";

interface IProduct {
    id?: number;
}

const addOrderHandler = async (
    email?: string,
    products?: IProduct[],
) => {

    const findResponse = await findOrderByEmail(email);

    if (!findResponse.data.length) {
        const order = await Order.create({ userEmail: email });

        const addItems = await addOrderItem(order.dataValues.id, products);

        return addItems;

    } else {

        const productMapping: IProduct[] = [];

        for (const product of products) {
            const resp = await checkItem(email, product);
            if (!resp.exist) {
                productMapping.push(product);
            }
        }

        const addItems = await addOrderItem(findResponse.id, productMapping);

        return addItems;
    }
};

export default addOrderHandler;