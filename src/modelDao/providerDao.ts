import { DataTypes } from 'sequelize';
const bCrypt = require('sequelize-bcrypt');

import { sequelize } from '../../connectDatabase';

const options = {
    field: 'PRVPASSWORD', 
    rounds: 12, 
    compare: 'authenticate',
}

const Provider = sequelize.define("Provider", {
	PROVIDERID: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		field: 'PROVIDERID'
	},
	PRVNAME: {
		type: DataTypes.STRING(50),
		field: 'PRVNAME'
	},
	PRVEMAIL: {
		type: DataTypes.STRING(50),
		field: 'PRVEMAIL'
	},
	PRVPASSWORD: {
		type: DataTypes.TEXT,
		field: 'PRVPASSWORD'
	},
	PRVCNPJ: {
		type: DataTypes.STRING(15),
		field: 'PRVCNPJ'
	},
	PRVBUSINESSNAME: {
		type: DataTypes.STRING(20),
		field: 'PRVBUSINESSNAME'
	},
	PRVFANTASYNAME: {
		type: DataTypes.STRING(30),
		field: 'PRVFANTASYNAME'
	},
	PRVSOCIALREASON: {
		type: DataTypes.STRING(20),
		field: 'PRVSOCIALREASON'
	},
	PRVSECTORACTING: {
		type: DataTypes.STRING(100),
		field: 'PRVSECTORACTING'
	},
	PRVCREATEDATE: {
		type: DataTypes.STRING(100),
		field: 'PRVCREATEDATE'
	},
	PRVUPDATEDATE: {
		type: DataTypes.STRING(100),
		field: 'PRVUPDATEDATE'
	}
  
}, {
	modelName: 'PROVIDER',
	tableName: 'PROVIDERS',
	timestamps: true,
	createdAt: false,
	updatedAt: false,
});
Provider.removeAttribute('id')
bCrypt(Provider, options);

export { Provider };

