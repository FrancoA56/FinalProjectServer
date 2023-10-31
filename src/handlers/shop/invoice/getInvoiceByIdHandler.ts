import { Invoice } from "../../../db";

const getInvoiceByEmail = async (idInvoice: number) => {

    const findOrder = await Invoice.findOne({
        where: { id: idInvoice }
    })

    return { data: findOrder  }
}


export default getInvoiceByEmail;