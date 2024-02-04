import { client } from "./client";
import { Application } from "express";

export function routes (app: Application) {
	client(app);
}