import { Request, Response } from "express";
import { IncomingHttpHeaders } from 'http';
import { Interface } from 'readline';

import { MessageOBJ, ProviderAttributes } from '../model/interfaces';
import { Secure } from '../utils';

export default class AbstractController {
	
	public message: MessageOBJ;
	public req: Request;
	public res: Response;

	protected model: any;
	
	constructor(req: Request, res: Response, abstractModel: any, action: string){ // [req, res, model]
		this.model = abstractModel;
		this.req = req;
		this.res = res;
		if(action === ""){
			this.authenticateUser(req.headers, req.params.id);
		}
		this.message = {
			code: 500,
			error: true,
			result: "",
			msg: "Internal error. Try again later!",
		}
	}

	public async authenticateUser(headers: IncomingHttpHeaders, id: string | number): Promise<void>{
		console.log("Entering in method authenticateUser(headers: IncomingHttpHeaders)");
		type PrvcltKeys = "provider" | "client";
		const prvclt: Record<PrvcltKeys, string>  = {
			provider: "PRV",
			client: "CLT"
		}
		const field: string = prvclt[this.model.name.toLowerCase() as PrvcltKeys] + "EMAIL";
		try {

			const [email, pass] = Secure.getBasicUser(headers)!;
			const user: any = await this.model.findByPk(id);
			if(!user) {
				throw new Error("User is not valid!");
			}
            await Secure.validatePass(pass, user);
            await Secure.emailIsRequired(email, user[field]);
		} catch (error) {
			console.error(error);
			this.message.error = true;
			this.message.code = 403;
			this.message.msg = 'Client unhauthorized!';
			this.message.result = null;
			throw new Error();
		}
	}
	
	public async save (body: any): Promise<void>  {
		console.log(`Entering in method AbstractController.save(body: ${typeof body} = `, body, `): Promise<MessageOBJ>`);
		try {

			this.message.code = 400;
			this.message.error = true;
			this.message.result = null;
			this.message.msg = "Verify the data and try again";
		
			const model = await this.model.create(body);
			
			if(model){
				this.message.code = 200;
				this.message.error = false;
				this.message.result = model;
				this.message.msg = "model created successfully!";
				return;
			} else {
				this.message.msg = "Wasn't possible to save the model. Verify the data and try again";
				return;
			}
		
		} catch (error) {
			this.message.result = null;
			this.message.error = true;
			this.message.msg = JSON.stringify(error);
			console.error(error);
			throw new Error();
		}
	}

	public async getByID (id: number | string ): Promise<void> {
		console.log(`Entering in method AbstractController.getByID(id: ${ typeof id} = ${id}): Promise<MessageOBJ>`);
		try {

			this.message.code = 400;
			this.message.error = true;
			this.message.result = null;
			this.message.msg = "Verify the data and try again";

			const model = await this.model.findByPk(id);
			
			if(model){
				this.message.code = 200;
				this.message.error = false;
				this.message.result = model;
				this.message.msg = "found the model successfully!";
				return;
			} else {
				this.message.code = 204;
				this.message.msg = "Wasn't possible to find the model. Verify the data and try again";
				return;
			}
			
		} catch (error: any) {
			this.message.result = null;
			this.message.error = true;
			this.message.msg = JSON.stringify(error);
			console.error(error);
			throw new Error();
		}
	}

	public async getByWhere(where: any): Promise<void> {
		console.log(`Entering in method AbstractController.getByWhere(id: ${typeof where} = ${where}): Promise<MessageOBJ>`);
		try {

			this.message.code = 400;
			this.message.error = true;
			this.message.result = null;
			this.message.msg = "Verify the data and try again";

			const model = await this.model.findOne(where);

			if (model) {
				this.message.code = 200;
				this.message.error = false;
				this.message.result = model;
				this.message.msg = "found the model successfully!";
				return;
			} else {
				this.message.code = 204;
				this.message.msg = "Wasn't possible to find the model. Verify the data and try again";
				return;
			}

		} catch (error) {
			this.message.result = null;
			this.message.error = true;
			this.message.msg = JSON.stringify(error);
			console.error(error);
			throw new Error();
		}
	}
	
	public async getList (): Promise<void> {
		console.log(`Entering in method AbstractController.getList(): Promise<MessageOBJ>`);
		
		try {

			this.message.code = 400;
			this.message.error = true;
			this.message.result = null;
			this.message.msg = "Verify the data and try again";

			const models = await this.model.findAll();
			
			if(models.length > 0){
				this.message.code = 200;
				this.message.error = false;
				this.message.result = models;
				this.message.msg = "found all models successfully!";
				return;
			} else {
				this.message.code = 204;
				this.message.msg = "Models wasn't possible to find!";
				return;
			}
			
		} catch (error: any) {
			this.message.result = null;
			this.message.error = true;
			this.message.msg = JSON.stringify(error);
			console.error(error);
			throw new Error();
		}
	}
		
	public async updateByID (body: any, where: any ): Promise<void> {
		console.log(`Entering in method AbstractController.updateByID(body: ${typeof body} = ${body}, id: ${typeof where} = ${where}): Promise<MessageOBJ>`);

		try {

			this.message.code = 400;
			this.message.error = true;
			this.message.result = null;
			this.message.msg = "Verify the data and try again";

			const modelUpdated = await this.model.update(body, {
				where: where
			});

			if (modelUpdated) {
				this.message.code = 200;
				this.message.error = false;
				this.message.result = modelUpdated;
				this.message.msg = "updated successfully!";
				return;
			} else {
				this.message.code = 400;
				this.message.msg = "Wasn't possible to update the model. Verify the data and try again";
				return;
			}
		} catch (error: any) {
			this.message.result = null;
			this.message.error = true;
			this.message.result = JSON.stringify(error);
			console.error(error);
			throw new Error();
		}
	}

	protected msgError(msg: MessageOBJ): MessageOBJ{
		msg.error = true;
		msg.result = null;
		return msg;
	}
	
	public async deleteByID (where: any): Promise<void> {
		console.log(`Entering in method AbstractController.deleteByID(id: ${typeof where} = ${where}): Promise<MessageOBJ>`);

		try {

			this.message.code = 400;
			this.message.error = true;
			this.message.result = null;
			this.message.msg = "Verify the data and try again";

			const modelDestroyed = await this.model.destroy({
				where: where
			});

			if (modelDestroyed) {
				console.log("Model destroyed!");
				
				this.message.code = 200;
				this.message.error = false;
				this.message.result = modelDestroyed;
				this.message.msg = "deleted successfully!";
				return;
			} else {
				this.message.msg = "Wasn't possible to delete the model. Verify the data and try again";
				return;
			}
		} catch (error: any) {
			this.message.result = null;
			this.message.error = true;
			this.message.result = JSON.stringify(error);
			console.error(error);
			throw new Error();
		}
	}
	
}
	
	