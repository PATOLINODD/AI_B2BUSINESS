import { Request, Response } from "express";

import AbstractController from "./abstractController";
import { ProviderAttributes } from "../model/interfaces";
import { UtilDate, Secure } from "../utils";
import { Provider } from "../modelDao";

class ProviderController extends AbstractController {
    constructor(model: any){
        super(model);
    }

    public async getProviderByID(req: Request, res: Response): Promise<void> {
        console.log(
          `Entering in method ProviderController.getProviderByID(req: Request, res: Response): Promise<void>`
        );
    
        try {
          const msg = await this.getByID(req.params.id);
    
          if (!msg.error) {
            const [email, pass] = Secure.getBasicUser(req.headers)!;
            await Secure.validatePass(pass, msg.result);
            await Secure.emailIsRequired(email, (msg.result as ProviderAttributes).PRVEMAIL);
    
            res.json(msg);
            return;
          }
          res.status(400).json(this.msgError(msg));
        } catch (error: any) {
          this.message.msg = error.message;
          res.status(500).json(this.msgError(this.message));
        }
      }
    
      public async getAllProviders(req: Request, res: Response): Promise<void> {
        console.log(
          `Entering in method UserController.getAllProviders(req: Request, res: Response): Promise<void>`
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
    
      public async saveProvider(req: Request, res: Response): Promise<void> {
        console.log(
          `Entering in method ProviderController.saveProvider(req: Request, res: Response): Promise<void>`
        );
    
        try {
          const providerBody: ProviderAttributes = req.body;
    
          await Secure.emailCantBeValid(
            { PRVEMAIL: providerBody.PRVEMAIL },
            this.model
          );
    
          providerBody.PRVCREATEDATE = UtilDate.dateTimeString(new Date());
          providerBody.PRVUPDATEDATE = UtilDate.dateTimeString(new Date());
    
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
    
      public async updateProviderByID(req: Request, res: Response): Promise<void> {
        console.log(
          `Entering in method ProviderController.updateProviderByID(req: Request, res: Response): Promise<void>`
        );
    
        try {
          const [email, pass] = Secure.getBasicUser(req.headers)!;
          const result = await this.getByID(req.params.id);
          await Secure.validatePass(pass, result.result);
          await Secure.emailIsRequired(email, (result.result as ProviderAttributes).PRVEMAIL);
          const providerBody: ProviderAttributes = req.body;
    
          providerBody.PRVUPDATEDATE = UtilDate.dateTimeString(new Date());
    
          const where = {
            PROVIDERID: req.params.id,
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
    
      public async deleteProviderByID(req: Request, res: Response): Promise<void> {
        console.log(
          `Entering in method ProviderController.deleteProviderByID(req: Request, res: Response): Promise<void>`
        );
    
        try {
          const [email, pass] = Secure.getBasicUser(req.headers)!;
          const result = await this.getByID(req.params.id);
          await Secure.validatePass(pass, result.result);
          await Secure.emailIsRequired(email, (result.result as ProviderAttributes).PRVEMAIL);
    
          const where = {
            PROVIDERID: req.params.id,
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

export default new ProviderController(Provider);