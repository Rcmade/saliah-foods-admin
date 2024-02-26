import transporter from "../nodemailer";
import twilio from "twilio";
import dataFormateService from "./dataformate.service";

class SendService {
  async sendEmailService(subject: string, toEmail: string, html: string) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: toEmail,
      subject: subject,
      html: html,
    };

    const send = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
          console.log("Email Send Error ", error);
          reject(false);
        } else {
          console.log("Email Send Info ", info);
          resolve(true);
        }
      });
    });

    return send;
    // return transporter.sendMail(mailOptions, function (error: any, info) {
    //   if (error) {
    //     console.log("Email Send Error ", error);
    //     return false;
    //   } else {
    //     // console.log("Email Send Info ", info);
    //     return true;
    //   }
    // });
  }

  async sendSMS(to: string, message: string): Promise<boolean> {
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      const formateData = {
        from: process.env.TWILIO_FROM_NUMBER,
        body: message,
        to: dataFormateService.normalizePhoneNumber(to),
      };

      return client.messages
        .create(formateData)
        .then((message) => {
          console.log(message);
          return true; // SMS sent successfully
        })
        .catch((error) => {
          console.error("Error sending SMS:", error);
          return false; // SMS not sent
        });
      return true; // SMS sent successfully
    } catch (error) {
      console.error("Error sending SMS:", error);
      return false; // SMS not sent
    }
  }
}

const sendService = new SendService();
export default sendService;
