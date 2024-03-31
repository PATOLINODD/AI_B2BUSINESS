import { ClientController } from "../controller";
import {Request, Response, Application } from "express";
import { Client } from "../modelDao";


export function client (app: Application) {
	app.get("/getClient/:id", async (req: Request, res: Response) => { 
		await new ClientController(req, res, Client, "").getClientByID();
	});
	app.get("/getAllClients", async (req: Request, res: Response) => { 
		await new ClientController(req, res, Client, "/getAll").getAllClients();
	});
	app.post("/saveClient", async (req: Request, res: Response) => {
		await new ClientController(req, res, Client, "/save").saveClient();
	});
	app.put("/updateClient/:id", async (req: Request, res: Response) => {
		await new ClientController(req, res, Client, "").updateClientByID();
	});
	app.delete("/deleteClient/:id", async (req: Request, res: Response) => {
		await new ClientController(req, res, Client, "").deleteClientByID();
	});
	
}