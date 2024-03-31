import { Request, Response } from "express";


import { ClientAttributes } from "../model/interfaces";
import { UtilDate, Secure } from "../utils";
import AbstractController from "./abstractController";

export class ClientController extends AbstractController {
  constructor(req: Request, res: Response, clientModel: any, action: string) {
    super(req, res, clientModel, action);
  }

  public async getClientByID(): Promise<void> {
    console.log(
      `Entering in method UserController.getClientByID(): Promise<void>`
    );

    try {
      await this.getByID(this.req.params.id);

      if (!this.message.error) {

        this.res.json(this.message);
        return;
      }
      this.res.status(400).json(this.msgError(this.message));
    } catch (error: any) {
      this.message.msg = error.message;
      this.res.status(500).json(this.msgError(this.message));
    }
  }

  public async getAllClients(): Promise<void> {
    console.log(
      `Entering in method UserController.getAllClients(): Promise<void>`
    );

    try {
      await this.getList();

      if (!this.message.error) {
        this.res.json(this.message);
        return;
      }

      this.res.status(400).json(this.msgError(this.message));
    } catch (error: any) {
      this.message.msg = error.message;
      this.res.status(500).json(this.message);
    }
  }

  public async saveClient(): Promise<void> {
    console.log(
      `Entering in method UserController.saveClient(): Promise<void>`
    );

    try {
      const clientBody: ClientAttributes = this.req.body;

      await Secure.emailCantBeValid(
        { CLTEMAIL: clientBody.CLTEMAIL },
        this.model
      );

      clientBody.CLTCREATEDATE = UtilDate.dateTimeString(new Date());
      clientBody.CLTUPDATEDATE = UtilDate.dateTimeString(new Date());

      await this.save(clientBody);

      if (!this.message.error) {
        this.res.json(this.message);
        return;
      }

      this.res.status(400).json(this.msgError(this.message));
    } catch (error: any) {
      this.message.msg = error.message;
      this.res.status(500).json(this.message);
    }
  }

  public async updateClientByID(): Promise<void> {
    console.log(
      `Entering in method UserController.updateClientByID(): Promise<void>`
    );

    try {
      const providerBody: ClientAttributes = this.req.body;

      providerBody.CLTUPDATEDATE = UtilDate.dateTimeString(new Date());

      const where = {
        CLTID: this.req.params.id,
      };

      await this.updateByID(providerBody, where);

      if (!this.message.error) {
        this.res.json(this.message);
        return;
      }
      this.res.status(400).json(this.msgError(this.message));
    } catch (error: any) {
      this.message.msg = error.message;
      this.res.status(500).json(this.message);
    }
  }

  public async deleteClientByID(): Promise<void> {
    console.log(
      `Entering in method UserController.deleteClientByID(): Promise<void>`
    );

    try {

      const where = {
        CLTID: this.req.params.id,
      };
      await this.deleteByID(where);

      if (!this.message.error) {
        this.res.json(this.message);
        return;
      }
      this.res.status(400).json(this.msgError(this.message));
    } catch (error: any) {
      this.message.msg = error.message;
      this.res.status(500).json(this.message);
    }
  }
}

