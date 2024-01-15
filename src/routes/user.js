const userController = require("../controller");

module.exports = (app) => {
	
	app.get("getUser", userController.getUserByID);
	app.post("saveUser", userController.saveUser);
	app.put("updateUser", userController.updateUserByID);
	app.delete("deleteUser", userController.deleteUserByID);
	
}