module.exports = class AbstractController {
	constructor(db){
		this.db = db;
		this.message = {
			code: 500,
			error: true,
			result: "",
			message: "",
		}
	}
	
	save = async (body) => {}
	
	getByID = async (id) => {}
	
	getList = async () => {}
		
	updateByID = async (body, id) => {}
	
	deleteByID = async (id) => {}
	
}
	
	