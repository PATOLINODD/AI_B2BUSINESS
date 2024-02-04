import { app } from "./infra";
import { sequelize } from "./connectDatabase";

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