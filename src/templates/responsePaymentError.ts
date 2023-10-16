import config from "../utils/config";

const responsePaymentError = () => {
    return `
        <html> 
            <head>
                <title>CODE CRAFTED TEMPLATES</title>
                <script>
                    setTimeout(function() {
                    window.location.href = "${config.urlClient}";
                    }, 9000);
                </script>
            </head>
            <body style="background-color:rgb(185, 185, 185)">
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

                                    <p style="color:#65605D; margin: 2px; font-size: 16px">
                                        <b style="font-size: 24px; color:black">¡Successful Payment!</b>
                                    </p>
                                    <p>Contact us through our website for payment confirmation</p>
                                    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
                                        <p style="margin: 10px;">Redirecting to Code Crafted Templates</p>
                                        <img style="width: 20px; height: 10px; margin-top: 10px;" src="https://i.postimg.cc/7PgSsgzY/puntos.gif">
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </body>
        </html>
        `
}

export default responsePaymentError;