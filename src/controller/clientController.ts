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
      const msg = await this.getByID(req.params.id);

      if (!msg.error) {
        const [email, pass] = Secure.getBasicUser(req.headers)!;
        await Secure.validatePass(pass, msg.result);
        await Secure.emailIsRequired(email, (msg.result as ClientAttributes).CLTEMAIL);

        res.json(msg);
        return;
      }
      res.status(400).json(this.msgError(msg));
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
      const msg = await this.getList();

      if (!msg.error) {
        res.json(msg);
        return;
      }

      res.status(400).json(this.msgError(msg));
    } catch (error: any) {
      this.message.msg = error.message;
      res.status(500).json(this.msgError(this.message));
    }
  }

  public async saveClient(req: Request, res: Response): Promise<void> {
    console.log(
      `Entering in method UserController.saveClient(req: Request, res: Response): Promise<void>`
    );

    try {
      const providerBody: ClientAttributes = req.body;

      await Secure.emailCantBeValid(
        { CLTEMAIL: providerBody.CLTEMAIL },
        this.model
      );

      providerBody.CLTCREATEDATE = UtilDate.dateTimeString(new Date());
      providerBody.CLTUPDATEDATE = UtilDate.dateTimeString(new Date());

      const msg = await this.save(providerBody);

      if (!msg.error) {
        res.json(msg);
        return;
      }

      res.status(400).json(this.msgError(msg));
    } catch (error: any) {
      this.message.msg = error.message;
      res.status(500).json(this.msgError(this.message));
    }
  }

  public async updateClientByID(req: Request, res: Response): Promise<void> {
    console.log(
      `Entering in method UserController.updateClientByID(req: Request, res: Response): Promise<void>`
    );

    try {
      const [email, pass] = Secure.getBasicUser(req.headers)!;
      const result = await this.getByID(req.params.id);
      await Secure.validatePass(pass, result.result);
      await Secure.emailIsRequired(email, (result.result as ClientAttributes).CLTEMAIL);
      const providerBody: ClientAttributes = req.body;

      providerBody.CLTUPDATEDATE = UtilDate.dateTimeString(new Date());

      const where = {
        CLTID: req.params.id,
      };

      const msg = await this.updateByID(providerBody, where);

      if (!msg.error) {
        res.json(msg);
        return;
      }
      res.status(400).json(this.msgError(msg));
    } catch (error: any) {
      this.message.msg = error.message;
      res.status(500).json(this.msgError(this.message));
    }
  }

  public async deleteClientByID(req: Request, res: Response): Promise<void> {
    console.log(
      `Entering in method UserController.deleteClientByID(req: Request, res: Response): Promise<void>`
    );

    try {
      const [email, pass] = Secure.getBasicUser(req.headers)!;
      const result = await this.getByID(req.params.id);
      await Secure.validatePass(pass, result.result);
      await Secure.emailIsRequired(email, (result.result as ClientAttributes).CLTEMAIL);

      const where = {
        CLTID: req.params.id,
      };
      const msg = await this.deleteByID(where);

      if (!msg.error) {
        res.json(msg);
        return;
      }
      res.status(400).json(this.msgError(msg));
    } catch (error: any) {
      this.message.msg = error.message;
      res.status(500).json(this.msgError(this.message));
    }
  }
}

const clientController = new ClientController(Client);
export { clientController };
