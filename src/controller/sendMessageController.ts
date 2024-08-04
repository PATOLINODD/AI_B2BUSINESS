import { emailAttributes } from "../model/types";
import { Request, Response } from "express";
import nodemailer from "nodemailer";

export class SendMessageEmail {
  sendEmail(req: Request, res: Response): void {
      const clientEmail: emailAttributes | any = req.body;
    const emailFrom = "lucas.lima@aib2business.com";
    const transporter = nodemailer.createTransport({
      host: "smtp.google.com",
      port: 587,
      secure: false,
      auth: {
        user: emailFrom,
        pass: "Deus1998.",
      },
    });
    const mailOptions = {
      from: emailFrom,
      to: emailFrom,
      subject: `PEDIDO DE CONSULTORIA BOTS`,
      Text: `
                nome: ${clientEmail.firstName} ${clientEmail.lastName}
                company: ${clientEmail.companyName}
                phone: ${clientEmail.phone}
                email: ${clientEmail.email}
            `,
      html: `
                <p>${clientEmail.description}</p>
            `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          res.send(error);
        return console.log("Error ocurred!");
      }
      res.send("All right: \n " + info.response)
      return console.log("all right!", info.response);
    });
  };
}