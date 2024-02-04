import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
	host: process.env.DB_HOST || '127.0.0.1',
	port: parseInt(process.env.DB_PORT || '3306'),
	dialect: 'mysql',
	logging: (...msg) => console.log(msg),
	logQueryParameters: true,
	dialectOptions: {
		flags: {
			DEPRECATION_WARNINGS: true,
		}
  },
});

export { sequelize };