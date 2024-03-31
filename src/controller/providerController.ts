import { Request, Response } from "express";

import AbstractController from "./abstractController";
import { ProviderAttributes } from "../model/interfaces";
import { UtilDate, Secure } from "../utils";

export class ProviderController extends AbstractController {
    constructor(req: Request, res: Response, providerModel: any, action: string){
        super(req, res, providerModel, action);
    }

    public async getProviderByID(): Promise<void> {
        console.log(
          `Entering in method ProviderController.getProviderByID(req: Request, res: Response): Promise<void>`
        );
    
        try {
          await this.getByID(this.req.params.id);
    
          if (!this.message.error) {
    
            this.res.json(this.message);
            return;
          }
          this.res.status(400).json(this.msgError(this.message));
        } catch (error: any) {
          this.res.status(500).json(this.message);
        }
      }
    
      public async getAllProviders(): Promise<void> {
        console.log(
          `Entering in method ProviderController.getAllProviders(): Promise<void>`
        );
    
        try {
          await this.getList();
    
          if (!this.message.error) {
            this.res.json(this.message);
            return;
          }
    
          this.res.status(this.message.code).json(this.msgError(this.message));
        } catch (error: any) {
          this.res.status(500).json(this.message);
        }
      }
    
      public async saveProvider(): Promise<void> {
        console.log(
          `Entering in method ProviderController.saveProvider(): Promise<void>`
        );
    
        try {
          const providerBody: ProviderAttributes = this.req.body;
    
          await Secure.emailCantBeValid(
            { PRVEMAIL: providerBody.PRVEMAIL },
            this.model
          );
    
          providerBody.PRVCREATEDATE = UtilDate.dateTimeString(new Date());
          providerBody.PRVUPDATEDATE = UtilDate.dateTimeString(new Date());
    
          await this.save(providerBody);
    
          if (!this.message.error) {
            this.res.json(this.message);
            return;
          }
    
          this.res.status(this.message.code).json(this.msgError(this.message));
        } catch (error: any) {
          this.res.status(500).json(this.message);
        }
      }
    
      public async updateProviderByID(): Promise<void> {
        console.log(
          `Entering in method ProviderController.updateProviderByID(): Promise<void>`
        );
    
        try {

          const providerBody: ProviderAttributes = this.req.body;
    
          providerBody.PRVUPDATEDATE = UtilDate.dateTimeString(new Date());
    
          const where = {
            PROVIDERID: this.req.params.id,
          };
    
          await this.updateByID(providerBody, where);
    
          if (!this.message.error) {
            this.res.json(this.message);
            return;
          }
          this.res.status(400).json(this.msgError(this.message));
        } catch (error: any) {
          this.res.status(500).json(this.message);
        }
      }
    
      public async deleteProviderByID(): Promise<void> {
        console.log(
          `Entering in method ProviderController.deleteProviderByID(): Promise<void>`
        );
    
        try {

    
          const where = {
            PROVIDERID: this.req.params.id,
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
