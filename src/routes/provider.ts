import { Request, Response, Application, NextFunction } from "express";

import { ProviderController } from "../controller";
import { Provider } from "../modelDao";

export function provider(app: Application) {
  app.get("/getProvider/:id", async (req: Request, res: Response) => {
    await new ProviderController(req, res, Provider, "").getProviderByID();
  });
  app.get("/getAllProviders", async (req: Request, res: Response) => {
    await new ProviderController(req, res, Provider, "/getAll").getAllProviders();
  });
  app.post("/saveProvider", async (req: Request, res: Response) => {
    await new ProviderController(req, res, Provider, "/save").saveProvider();
  });
  app.put("/updateProvider/:id", async (req: Request, res: Response) => {
    await new ProviderController(req, res, Provider, "").updateProviderByID();
  });
  app.delete("/deleteProvider/:id", async (req: Request, res: Response) => {
    await new ProviderController(req, res, Provider, "").deleteProviderByID();
  });
}
