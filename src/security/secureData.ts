import { IncomingHttpHeaders } from 'http';
import { ClientAttributes, MessageOBJ } from '../model/interfaces';
import { NextFunction } from 'express';

export const Secure = {

    message: "Client unhauthorized!",

    getBasicUser: function (header: IncomingHttpHeaders): string[] | null {
        console.log(`Entering in method Secure.getBasicUser(header: IncomingHttpHeaders): string[] | null`);

        const { authorization } = header;

        const basic = authorization?.replace('Basic ', "").trim();

        if (!basic) {
            return null;
        }

        const decoded = Buffer.from(basic, 'base64').toString('utf-8');
        return decoded.split(":");
    },

    validatePass: async function (token: string, model: any): Promise<void> {
        console.log(`Entering in method Secure.validatePass(token: string, model: any): Promise<void>`);
        try {
            console.log(model)
            if (!model) {
                throw new Error(this.message);
            }

            const isValid = await model.authenticate(token);

            if (!isValid) {
                throw new Error(this.message);
            }
            

        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    },

    emailCantBeValid: async function (where: any, model: any): Promise<void> {
        console.log(`Entering in method Secure.emailCantBeValid(where: any, model: any): Promise<void>`);
        try {

            const emailExists = await model.findOne({ where: where });

            if (emailExists) {
                throw new Error("Email already exist!");
            }

        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    },
    emailIsRequired: async function (email: any, emailFromModel: string): Promise<void> {
        console.log(`Entering in method Secure.emailIsRequired(where: any, model: any): Promise<void>`);
        try {

            const emailIsValid = email.match(emailFromModel);

            if (!emailIsValid) {
                throw new Error(this.message);
            }

        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }

    },
    authenticateUser: function(...pathParams: any): string {
        console.log("Entering in method Secure.authenticateUser");
        return "";
    }

}