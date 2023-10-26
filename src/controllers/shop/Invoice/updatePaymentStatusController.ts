import { Request, Response } from "express";
import updateStatusPayment from "../../../handlers/shop/invoice/UpdatePaymentStatusHandler";

const editStatusPaid = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        interface IParam {
            id?: string;
        }

        const { id }: IParam = req.params;

        const response = await updateStatusPayment(id, true);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
export default editStatusPaid;