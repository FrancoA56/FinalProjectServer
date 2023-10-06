import { Order, OrderItem, Preset } from "../../../db";
import ERROR_CODES from "../errorHandler";
import IResponse from "../interfaceResponse";

const moduleName = "findOrderByUser";
interface IMappingOrder {
    id: number,
    presetId: number,
    price: number
}
interface IPresets {
    dataValues: {
        presetId: number;
        preset: {
            dataValues: {
                price: number
            }
        }
    };
}

const findOrderByUser = async (email: string): Promise<IResponse> => {
    try {

        const findOrder = await Order.findOne({
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

        const mappingOrder: IMappingOrder = findOrder.dataValues.orderItems.map((preset: IPresets) => {
            return {
                presetId: preset.dataValues.presetId,
                price: preset.dataValues.preset.dataValues.price
            }
        })

        const { id, userEmail } = findOrder.dataValues;

        return {
            isSuccess: findOrder ? true : false,
            data: [{ id, userEmail, data: mappingOrder }]
        };

    } catch (error) {

        return {
            ...ERROR_CODES.CATCH_ERROR,
            error: (error as Error).message,
            modulo: moduleName
        }
    }
}


export default findOrderByUser;