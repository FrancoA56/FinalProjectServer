import { Router } from "express";
import addOrderController from "../controllers/shop/order/addOrderController";
import getOrderByEmailController from "../controllers/shop/order/getOrderByEmailController";
import payOrder from "../controllers/shop/order/createPaymentOrderController";
import captureOrder from "../controllers/shop/order/paypal/capturePaymentOrderController";
import cancelOrder from "../controllers/shop/order/paypal/cancelPaymentOrderControler";
import deleteOrderItem from "../controllers/shop/order/deleteOrderItemController";
import getInvoiceByEmail from "../controllers/shop/Invoice/getInvoiceByParamController";
import getAllInvoice from "../controllers/shop/Invoice/getAllInvoiceController";
import updateStatusPayment from "../controllers/shop/Invoice/updatePaymentStatusController";

const shopRouter = Router();

shopRouter.post("/pay_order", payOrder);
shopRouter.get("/order/capture_order_payment", captureOrder);
shopRouter.get("/order/cancel_order_payment", cancelOrder);
shopRouter.get("/order", getOrderByEmailController);
shopRouter.post("/order", addOrderController);
shopRouter.delete("/order", deleteOrderItem);
shopRouter.put("/invoice/:id", updateStatusPayment);
shopRouter.get("/invoice/:param", getInvoiceByEmail);
shopRouter.get("/invoice", getAllInvoice);


export default shopRouter;
