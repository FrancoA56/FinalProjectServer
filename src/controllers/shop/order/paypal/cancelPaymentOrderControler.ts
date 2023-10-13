import { Request, Response } from "express";
import config from '../../../../utils/config';

const cancelOrder = (
    req: Request,
    res: Response) => {

    res.redirect(`${config.urlClient}/shop`);

}

export default cancelOrder;