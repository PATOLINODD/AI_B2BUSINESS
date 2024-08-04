import { Application, Request, Response } from "express";
import { SendMessageEmail } from '../controller/sendMessageController';

export const sendEmail = (app: Application) =>{
    app.post('/sendEmail', (req: Request, res: Response) => {
        new SendMessageEmail().sendEmail(req, res);
    });
}