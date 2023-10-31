import { Order, OrderItem, Preset } from "../../../db";

interface IMappingOrder {
    presetId?: number,
    price?: number
}
interface IPresets {
    dataValues: {
        presetId: number;
    };
}

const findOrderByUser = async (email: string)=> {

    const findOrder = await Order.findAll({
        where: { userEmail: email },
        include: [{
            model: OrderItem,
            attributes: ['presetId'],
            include: [{
                model: Preset,
                attributes: ['price'],
            }],
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
   
    const data: undefined[]=[];
    if (!findOrder[0]) return { data };

    const mappingOrder: IMappingOrder[] = findOrder[0].dataValues.orderItems.map(
        (preset: IPresets) => preset.dataValues.presetId)

    const { id } = findOrder[0].dataValues;

    return { id, data: mappingOrder }
}


export default findOrderByUser;