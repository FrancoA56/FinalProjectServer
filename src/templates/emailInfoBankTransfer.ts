
const emailInfoBankTransfer = (userName: string, totalAmount:number) => {

    return `
                <div style="width:100%; height: 100vb; background-color:rgb(185, 185, 185)">
                <table style="max-width: 450px; padding: 7px; margin:0 auto; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0">
                            <img style="padding: 0; display: block; border-radius: 10px 10px 0px 0px;"
                                src="https://i.postimg.cc/SQPZWLcT/code.jpg" width="100%">
                        </td>
                    </tr>
                    <tr style="height: 200px; ">
                        <td style="background-color: white">
                            <div style="margin: 4% 10% 2%; text-align:center ;font-family: Tahoma;">
        
                               <p>¡Hello ${userName}, These are the bank details for you to make the payment for your purchase</p>
                                <p><u>Bank Details</u></p>
                                <div class="info">
                                    <div><strong>Account Holder's Name:</strong> [Full Name]</div>
                                    <div><strong>Account Type:</strong> [Checking / Savings Account]</div>
                                    <div><strong>Account Number:</strong> [Account Number]</div>
                                    <div><strong>CBU Number:</strong> [CBU Number]</div>
                                    <div><strong>Bank Name:</strong> [Bank Name]</div>
                                    <div><strong>Branch Number:</strong> [Branch Number]</div>
                                    <div><strong>SWIFT/BIC Code:</strong> [SWIFT/BIC Code]</div>
                                    <div><strong>ID/Tax ID of Account Holder:</strong> [ID/Tax ID Number]</div>
                                </div>
                                <b>The total amount to be paid: ${totalAmount} $</b>
        
                                <p>Once you make the payment, you can email us at codecraftedtemplates@gmail.com for confirmation.</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            `;
}

export default emailInfoBankTransfer;