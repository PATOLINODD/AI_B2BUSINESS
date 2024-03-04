import { Request, Response } from "express";

import { ClientAttributes } from "../model/interfaces";
import { Client } from "../modelDao";
import { UtilDate, Secure } from "../utils";

import AbstractController from "./abstractController";

export class ClientController extends AbstractController {
  constructor(model: any) {
    super(model);
  }

  public async getClientByID(req: Request, res: Response): Promise<void> {
    console.log(
      `Entering in method UserController.getClientByID(req: Request, res: Response): Promise<void>`
    );

    try {
      await this.getByID(req.params.id);

      if (!this.message.error) {
        await this.authenticateUser(req.headers, req.params.id);

        res.json(this.message);
        return;
      }
      res.status(400).json(this.msgError(this.message));
    } catch (error: any) {
      this.message.msg = error.message;
      res.status(500).json(this.msgError(this.message));
    }
  }

  public async getAllClients(req: Request, res: Response): Promise<void> {
    console.log(
      `Entering in method UserController.getAllClients(req: Request, res: Response): Promise<void>`
    );

    try {
      await this.getList();

      if (!this.message.error) {
        res.json(this.message);
        return;
      }

      res.status(400).json(this.msgError(this.message));
    } catch (error: any) {
      this.message.msg = error.message;
      res.status(500).json(this.message);
    }
  }

  public async saveClient(req: Request, res: Response): Promise<void> {
    console.log(
      `Entering in method UserController.saveClient(req: Request, res: Response): Promise<void>`
    );

    try {
      const clientBody: ClientAttributes = req.body;

      await Secure.emailCantBeValid(
        { CLTEMAIL: clientBody.CLTEMAIL },
        this.model
      );

      clientBody.CLTCREATEDATE = UtilDate.dateTimeString(new Date());
      clientBody.CLTUPDATEDATE = UtilDate.dateTimeString(new Date());

      await this.save(clientBody);

      if (!this.message.error) {
        res.json(this.message);
        return;
      }

      res.status(400).json(this.msgError(this.message));
    } catch (error: any) {
      this.message.msg = error.message;
      res.status(500).json(this.message);
    }
  }

  public async updateClientByID(req: Request, res: Response): Promise<void> {
    console.log(
      `Entering in method UserController.updateClientByID(req: Request, res: Response): Promise<void>`
    );

    try {
      await this.authenticateUser(req.headers, req.params.id);
      const providerBody: ClientAttributes = req.body;

      providerBody.CLTUPDATEDATE = UtilDate.dateTimeString(new Date());

      const where = {
        CLTID: req.params.id,
      };

      await this.updateByID(providerBody, where);

      if (!this.message.error) {
        res.json(this.message);
        return;
      }
      res.status(400).json(this.msgError(this.message));
    } catch (error: any) {
      this.message.msg = error.message;
      res.status(500).json(this.message);
    }
  }

  public async deleteClientByID(req: Request, res: Response): Promise<void> {
    console.log(
      `Entering in method UserController.deleteClientByID(req: Request, res: Response): Promise<void>`
    );

    try {

      await this.authenticateUser(req.headers, req.params.id);

      const where = {
        CLTID: req.params.id,
      };
      await this.deleteByID(where);

      if (!this.message.error) {
        res.json(this.message);
        return;
      }
      res.status(400).json(this.msgError(this.message));
    } catch (error: any) {
      this.message.msg = error.message;
      res.status(500).json(this.message);
    }
  }
}

const clientController = new ClientController(Client);
export { clientController };
