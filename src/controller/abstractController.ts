import { MessageOBJ } from '../model/interfaces';

export default class AbstractController {
	
	public message: MessageOBJ;
	
	protected model: any;
	
	constructor(model: any){
		this.model = model;
		this.message = {
			code: 500,
			error: true,
			result: "",
			msg: "Internal error. Try again later!",
		}
	}
	
	public async save (body: any): Promise<MessageOBJ>  {
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
			} 
	
			return this.message;
		
		} catch (error) {
			this.message.result = null;
			this.message.error = true;
			this.message.msg = error.message;
			console.error(error);
			throw new Error(this.message + "");
		}
	}

	public async getByID (id: number | string ): Promise<MessageOBJ> {
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
			}
			return this.message;
			
		} catch (error) {
			this.message.result = null;
			this.message.error = true;
			this.message.msg = error.message;
			console.error(error);
			throw new Error(this.message + "");
		}
	}

	public async getByWhere(where: any): Promise<MessageOBJ> {
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
			}
			return this.message;

		} catch (error) {
			this.message.result = null;
			this.message.error = true;
			this.message.msg = error.message;
			console.error(error);
			throw new Error(this.message + "");
		}
	}
	
	public async getList (): Promise<MessageOBJ> {
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
			}
			
			return this.message;
		} catch (error: any) {
			this.message.result = null;
			this.message.error = true;
			this.message.msg = error.message;
			console.error(error);
			throw new Error(this.message + "");
		}
	}
		
	public async updateByID (body: any, where: any ): Promise<MessageOBJ> {
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
			}
			return this.message;
		} catch (error: any) {
			this.message.result = null;
			this.message.error = true;
			this.message.result = error.message;
			console.error(error);
			throw new Error(this.message + "");
		}
	}
	
	public async deleteByID (where: any): Promise<MessageOBJ> {
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
				this.message.code = 200;
				this.message.error = false;
				this.message.result = modelDestroyed;
				this.message.msg = "deleted successfully!";
			}
			return this.message;
		} catch (error: any) {
			this.message.result = null;
			this.message.error = true;
			this.message.result = error.message;
			console.error(error);
			throw new Error(this.message + "");
		}
	}
	
}
	
	