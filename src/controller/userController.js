const AbstractController = require("./abstractController.js");


class UserController {
	constructor(user) {
		super(user);
	}
	
	getUserByID = async (req, res) => {
		try {
			
			const msg = await this.getByID(req.body, req.params.id);
			
			if(!msg.error){
				res.json(this.message);
			}
			res.status(400).json(this.message);
		} catch(error){
			res.status(500).json(this.message);
		}
	}
	
	saveUser = async (req, res) => {
		try {
			
			const msg = await this.save(req.body);
			
			if(!msg.error){
				res.json(msg);
			}
			res.status(400).json(msg);
		} catch(error){
			res.status(500).json(this.message);
		}
	}
	
	updateUserByID = async (req, res) => {
		try {
			
			const msg = await this.update(req.body);
			
			if(!msg.error){
				res.json(msg);
			}
			res.status(400).json(msg);
		} catch(error){
			res.status(500).json(this.message);
		}
	}
	
	deleteUserByID = async (req, res) => {
		try {
			
			const msg = await this.delete(req.body);
			
			if(!msg.error){
				res.json(msg);
			}
			res.status(400).json(msg);
		} catch(error){
			res.status(500).json(this.message);
		}
	}
}


module.exports = new UserController();