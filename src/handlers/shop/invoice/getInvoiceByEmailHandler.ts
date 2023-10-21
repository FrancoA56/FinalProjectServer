import { Invoice, InvoiceItem, Preset, User } from "../../../db";

const getInvoiceByEmail = async (userEmail: string) => {

    const findOrder = await Invoice.findAll({
        where: { userEmail },
        include: [{
            model: InvoiceItem,
            attributes: ['presetId'],
            include: [{
                model: Preset,
                attributes: ['price', ['name', 'presetName'], "defaultColor", "type", "category"],
            }],
        },
        {
            model: User,
            attributes: [['name', 'userName']]
        }
        ],
        attributes: {
            exclude: ['updatedAt']
        }
    })

    const data: undefined[] = [];
    if (!findOrder) return { data };

    const { id } = findOrder[0].dataValues;

    const response = findOrder.map(invoice => invoice.dataValues)

    return { id, data: response }
}


export default getInvoiceByEmail;