import { Invoice, InvoiceItem, Preset, User } from "../../../db";

const findOrderByUser = async (paymentId: string) => {

    const findOrder = await Invoice.findOne({
        where: { paymentId },
        include: [{
            model: InvoiceItem,
            attributes: ['presetId'],
            include: [{
                model: Preset,
                attributes: ['price', ['name', 'presetName']],
            }],
        },
        {
            model: User,
            attributes: [['name', 'userName']]
        }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })

    const data: undefined[] = [];
    if (!findOrder) return { data };

    const { id } = findOrder.dataValues;

    return { id, data: findOrder.dataValues }
}


export default findOrderByUser;