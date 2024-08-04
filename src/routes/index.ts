import { Application } from "express";
import { client } from "./client";
import { provider } from "./provider";
import { sendEmail } from "./sendEmail";

export function routes(app: Application) {
  client(app);
  provider(app);
  sendEmail(app);
}
