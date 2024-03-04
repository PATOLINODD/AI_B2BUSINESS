import { providerController } from "../controller";
import { Request, Response, Application, NextFunction } from "express";


export function provider (app: Application) {
	
	app.get("/getProvider/:id", async (req: Request, res: Response) => { 
		await providerController.getProviderByID(req, res);
	});
	app.get("/getAllProviders", async (req: Request, res: Response) => { 
		await providerController.getAllProviders(req, res);
	});
	app.post("/saveProvider", async (req: Request, res: Response) => {
		await providerController.saveProvider(req, res);
	});
	app.put("/updateProvider/:id", async (req: Request, res: Response) => {
		await providerController.updateProviderByID(req, res);
	});
	app.delete("/deleteProvider/:id", async (req: Request, res: Response) => {
		await providerController.deleteProviderByID(req, res);
	});
	
}