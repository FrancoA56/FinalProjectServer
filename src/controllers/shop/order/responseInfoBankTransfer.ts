import { Request, Response } from "express";


const responseInfoBankTransfer = async (
    req: Request,
    res: Response) => {

    try {

        return res.send();

    } catch (error) {

        res.status(500).send();
    }
}