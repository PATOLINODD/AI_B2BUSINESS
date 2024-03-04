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
          await this.getByID(req.params.id);
    
          if (!this.message.error) {
            await this.authenticateUser(req.headers, req.params.id);
    
            res.json(this.message);
            return;
          }
          res.status(400).json(this.msgError(this.message));
        } catch (error: any) {
          res.status(500).json(this.message);
        }
      }
    
      public async getAllProviders(req: Request, res: Response): Promise<void> {
        console.log(
          `Entering in method UserController.getAllProviders(req: Request, res: Response): Promise<void>`
        );
    
        try {
          await this.getList();
    
          if (!this.message.error) {
            res.json(this.message);
            return;
          }
    
          res.status(400).json(this.msgError(this.message));
        } catch (error: any) {
          res.status(500).json(this.message);
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
    
          await this.save(providerBody);
    
          if (!this.message.error) {
            res.json(this.message);
            return;
          }
    
          res.status(400).json(this.msgError(this.message));
        } catch (error: any) {
          res.status(500).json(this.message);
        }
      }
    
      public async updateProviderByID(req: Request, res: Response): Promise<void> {
        console.log(
          `Entering in method ProviderController.updateProviderByID(req: Request, res: Response): Promise<void>`
        );
    
        try {
          await this.authenticateUser(req.headers, req.params.id);

          const providerBody: ProviderAttributes = req.body;
    
          providerBody.PRVUPDATEDATE = UtilDate.dateTimeString(new Date());
    
          const where = {
            PROVIDERID: req.params.id,
          };
    
          await this.updateByID(providerBody, where);
    
          if (!this.message.error) {
            res.json(this.message);
            return;
          }
          res.status(400).json(this.msgError(this.message));
        } catch (error: any) {
          res.status(500).json(this.message);
        }
      }
    
      public async deleteProviderByID(req: Request, res: Response): Promise<void> {
        console.log(
          `Entering in method ProviderController.deleteProviderByID(req: Request, res: Response): Promise<void>`
        );
    
        try {

          await this.authenticateUser(req.headers, req.params.id);
    
          const where = {
            PROVIDERID: req.params.id,
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

export default new ProviderController(Provider);