import { app } from "./infra";
import { sequelize } from "./connectDatabase";
import express from 'express';
import { Secure } from './src/security/secureData';

app.use(express.json);
app.use(Secure.authenticateUser);

(async () => {
	try {
		await sequelize.sync({ match: /IAB2BUSINESS/ });
		console.log("connect successfully!");
	} catch (error) {
		console.log(error);
	}
})();

app.listen(4200, () => {
	console.log("app listening in port 4200")
});