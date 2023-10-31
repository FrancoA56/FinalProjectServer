import { OrderItem } from "../../../db";

interface IProduct {
    id?: number;
}

interface IMapPreset {
    dataValues: {
        presetId?: number;
    }
}

const addOrderItem = async (
    idOrder: number,
    products: IProduct[]

) => {

    const newParamProducts = products.map(p => ({
        presetId: p,
        orderId: idOrder
    }));

    const orderItem = await OrderItem.bulkCreate(newParamProducts);

    const mappingOrderItem =  orderItem.map((item: IMapPreset) => item.dataValues.presetId);

    return { data: !mappingOrderItem ? [] : mappingOrderItem }

}

export default addOrderItem;