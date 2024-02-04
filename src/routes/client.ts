import { clientController } from "../controller";
import {Request, Response, Application } from "express";


export function client (app: Application) {
	app.get("/getClient/:id", async (req: Request, res: Response) => { 
		await clientController.getClientByID(req, res);
	});
	app.get("/getAllClients", async (req: Request, res: Response) => { 
		await clientController.getAllClients(req, res);
	});
	app.post("/saveClient", async (req: Request, res: Response) => {
		await clientController.saveClient(req, res);
	});
	app.put("/updateClient/:id", async (req: Request, res: Response) => {
		await clientController.updateClientByID(req, res);
	});
	app.delete("/deleteClient/:id", async (req: Request, res: Response) => {
		await clientController.deleteClientByID(req, res);
	});
	
}