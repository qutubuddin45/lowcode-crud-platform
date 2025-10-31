import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/auth";
import fs from "fs";
import path from "path";


const router = express.Router();
const prisma = new PrismaClient();

/**
 * RBAC Configuration
 * Each role defines what actions they can perform
 */
const RBAC = {
  Admin: ["create", "read", "update", "delete"],
  Manager: ["create", "read", "update"],
  Viewer: ["read"],
};

/**
 * Helper function to check permission
 */
function hasPermission(role: string, action: string): boolean {
  const allowedActions = RBAC[role as keyof typeof RBAC];
  return allowedActions?.includes(action) || allowedActions?.includes("all");
}

// ✅ Get all products
router.get("/products", authMiddleware, async (req: any, res) => {
  try {
    const userRole = req.user?.role || "Viewer";

    if (!hasPermission(userRole, "read")) {
      return res.status(403).json({ error: "Access Denied" });
    }

    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Create new product
router.post("/products", authMiddleware, async (req: any, res) => {
  try {
    const userRole = req.user?.role || "Viewer";

    if (!hasPermission(userRole, "create")) {
      return res.status(403).json({ error: "Access Denied" });
    }

    const { name, price, ownerId } = req.body;

    const product = await prisma.product.create({
      data: { name, price, ownerId },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// ✅ Update product
router.put("/products/:id", authMiddleware, async (req: any, res) => {
  try {
    const userRole = req.user?.role || "Viewer";

    if (!hasPermission(userRole, "update")) {
      return res.status(403).json({ error: "Access Denied" });
    }

    const id = parseInt(req.params.id);
    const { name, price } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: { name, price },
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

const MODELS_DIR = path.join(__dirname, "..", "models");

router.get("/models", (req, res) => {
  const files = fs.readdirSync(MODELS_DIR);
  const modelNames = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => path.basename(f, ".json"));
  res.json(modelNames);
});


// ✅ Delete product
router.delete("/products/:id", authMiddleware, async (req: any, res) => {
  try {
    const userRole = req.user?.role || "Viewer";

    if (!hasPermission(userRole, "delete")) {
      return res.status(403).json({ error: "Access Denied" });
    }

    const id = parseInt(req.params.id);
    await prisma.product.delete({ where: { id } });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
