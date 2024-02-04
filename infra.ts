import express, { Application } from "express";
import { routes } from "./src/routes";
import log from './configLog';

export const app: Application = express();

app.use(express.json());

routes(app);

console.log = log();
console.error = console.log;