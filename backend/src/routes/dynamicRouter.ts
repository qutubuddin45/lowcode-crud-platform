import path from "path";
import fs from "fs/promises";
import express from "express";
import { rbacMiddleware } from "../middleware/rbac";
import genericController from "../controllers/genricController";

const MODELS_DIR = path.join(__dirname, "..", "models");

export async function loadAndRegisterAll(app: express.Express) {
  const files = await fs.readdir(MODELS_DIR);
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const content = await fs.readFile(path.join(MODELS_DIR, file), "utf-8");
    const model = JSON.parse(content);
    registerModelRoutes(app, model);
  }
}

function registerModelRoutes(app: express.Express, model: any) {
  const tableName = model.tableName || (model.name.toLowerCase());
  const base = `/api/${tableName}`;
  const router = express.Router();

  router.post("/", rbacMiddleware(model, "create"), (req, res) => genericController.create(req, res, model));
  router.get("/", rbacMiddleware(model, "read"), (req, res) => genericController.list(req, res, model));
  router.get("/:id", rbacMiddleware(model, "read"), (req, res) => genericController.get(req, res, model));
  router.put("/:id", rbacMiddleware(model, "update"), (req, res) => genericController.update(req, res, model));
  router.delete("/:id", rbacMiddleware(model, "delete"), (req, res) => genericController.remove(req, res, model));

  app.use(base, router);
}
