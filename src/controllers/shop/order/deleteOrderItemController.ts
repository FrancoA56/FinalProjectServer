import { Request, Response } from "express";
import deleteOrderItemHandler from "../../../handlers/shop/order/deleteOrderHandler";
import getOrderHandler from "../../../handlers/shop/order/getOrderByEmailHandler";

const deleteOrderItem = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {

        interface IQuery {
            id?: number;
            email?: string;
        }

        let deleteAllOrder = false;

        const { email, id = undefined }: IQuery = req.query;

        const response = await getOrderHandler(email);

        if (id === undefined || (response.data.length === 1 && response.data[0] === Number(id))) {

            deleteAllOrder = true;
        }

        await deleteOrderItemHandler(email, id, response.id, deleteAllOrder);

        res.status(201).json({ isSuccess: true });

    } catch (error) {
        res.status(500).json({ isSuccess: false });
    }
};

export default deleteOrderItem;