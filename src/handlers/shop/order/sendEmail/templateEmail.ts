
const templateEmail = (userName: string, templateName: string[]) => {

    return `
                <div>
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
        
                                <p>¡Hello ${userName}, thank you for your purchase!</p>
                                <p>Purchase Details:</p>
                                <ul>
                                ${templateName.map(template => {

                                    return `<li style="list-style: none;">${template}</li>`

                                 })}
                                </ul>
        
                                <p>We will be contacting you in the next few hours.</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            `;
}

export default templateEmail;