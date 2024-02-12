import { Application } from "express";
import { client } from "./client";
import { provider } from "./provider";

export function routes (app: Application) {
	client(app);
	provider(app);
}