import { Request, Response } from "express";

import { ClientAttributes } from "../model/interfaces";
import { Client } from "../modelDao";
import { UtilDate, Secure } from '../utils';

import AbstractController from "./abstractController";


class ClientController extends AbstractController {
	constructor(model: any){
		super(model);
	}
	
	public async getClientByID (req: Request, res: Response): Promise<void> {
		console.log(`Entering in method UserController.getClientByID(req: Request, res: Response): Promise<void>`);

		try {

			const msg = await this.getByID(+req.params.id);
			
			if (!msg.error) {

				const [email, pass] = Secure.getBasicUser(req.headers)!;
				await Secure.validatePass(pass, msg.result);
				await Secure.emailIsRequired({ CLTEMAIL: email }, this.model);

				res.json(msg);
				return;
			}
			res.status(400).json(msg);
		} catch (error: any) {
			this.message.msg = error.message;
			res.status(500).json(this.message);
		}
	}
	
	public async getAllClients (req: Request, res: Response): Promise<void> {
		console.log(`Entering in method UserController.getAllClients(req: Request, res: Response): Promise<void>`);
		
		try {
		
			const msg = await this.getList();
			
			if (!msg.error) {

				res.json(msg);
				return;
			}
			
			res.status(400).json(msg);
		
		} catch (error: any) {
			this.message.msg = error.message;
			res.status(500).json(this.message);
		}
	}
	
	public async saveClient (req: Request, res: Response): Promise<void> {
		console.log(`Entering in method UserController.saveClient(req: Request, res: Response): Promise<void>`);
		
		try {

			const clientBody: ClientAttributes = req.body;
			
			await Secure.emailCantBeValid({ CLTEMAIL: clientBody.CLTEMAIL }, this.model);

			clientBody.CLTCREATEDATE = UtilDate.dateTimeString(new Date());
			clientBody.CLTUPDATEDATE = UtilDate.dateTimeString(new Date());


			const msg = await this.save(clientBody);
			
			if(!msg.error){
				res.json(msg);
				return;
			}
			
			res.status(400).json(msg);
		} catch (error: any) {
			this.message.msg = error.message;
			res.status(500).json(this.message);
		}
	}
	
	public async updateClientByID (req: Request, res: Response): Promise<void> {
		console.log(`Entering in method UserController.updateClientByID(req: Request, res: Response): Promise<void>`);

		try {

			const [email, pass] = Secure.getBasicUser(req.headers)!;
			const result = await this.getByID(req.params.id);
			await Secure.validatePass(pass, result.result);
			await Secure.emailIsRequired({ CLTEMAIL: email }, this.model);


			const clientBody: ClientAttributes = req.body;

			clientBody.CLTUPDATEDATE = UtilDate.dateTimeString(new Date);

			const where = {
				CLTID: req.params.id
			}

			const msg = await this.updateByID(clientBody, where);
			
			if (!msg.error) {


				res.json(msg);
				return;
			}
			res.status(400).json(msg);
		} catch (error: any) {
			this.message.msg = error.message;
			res.status(500).json(this.message);
		}
	}
	
	public async deleteClientByID (req: Request, res: Response): Promise<void> {
		console.log(`Entering in method UserController.deleteClientByID(req: Request, res: Response): Promise<void>`);
		
		try {
			const where = {
				CLTID: req.params.id
			};
			const msg = await this.deleteByID(where);
			
			if (!msg.error) {

				const [email, pass] = Secure.getBasicUser(req.headers)!;
				const result = await this.getByID(req.params.id);
				await Secure.validatePass(pass, result.result);
				await Secure.emailIsRequired({ CLTEMAIL: email }, this.model);

				res.json(msg);
				return;
			}
			res.status(400).json(msg);
		} catch (error: any) {
			this.message.msg = error.message;
			res.status(500).json(this.message);
		}
	}
}

const clientController = new ClientController(Client);
export { clientController };
