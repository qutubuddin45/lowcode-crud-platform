import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function mapTableToModel(modelName: string) {
  // Prisma client requires model names compiled in schema.prisma.
  // For dynamic tables you could use prisma.$queryRaw or a generic DB client.
  return modelName; // placeholder
}

export default {
    async create(req: Request, res: Response, model: any) {
  try {
    const data = req.body;
    const table = model.tableName || model.name;

    const cols = Object.keys(data).map((c) => `\`${c}\``).join(", ");
    const vals = Object.values(data)
      .map((v) => (typeof v === "string" ? `'${v}'` : v))
      .join(", ");
    const sql = `INSERT INTO \`${table}\` (${cols}) VALUES (${vals});`;

    console.log("🟢 SQL Executing:", sql);
    console.log("👤 Auth User:", (req as any).user);

    await prisma.$executeRawUnsafe(sql);

    res.json({ ok: true });
  } catch (err: any) {
    console.error("🔥 Create Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
},
async list(req: Request, res: Response, model: any) {
    try {
      const table = model.tableName || model.name.toLowerCase() ;
      const rows: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM \`${table}\` LIMIT 100;`);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: String(err) });
    }
  },

  async get(req: Request, res: Response, model: any) {
    // similar to list with WHERE id = ?
  },

   async update(req: Request, res: Response, model: any) {
  try {
    const id = req.params.id;
    const data = req.body;
    const table = model.tableName || model.name.toLowerCase() ;

    console.log("🛠️ Updating record in:", table, "ID:", id);

    // 🧩 Build SET clause dynamically from body
    const updates = Object.entries(data)
      .map(([key, value]) => `\`${key}\` = ${typeof value === "string" ? `'${value}'` : value}`)
      .join(", ");

    const sql = `UPDATE \`${table}\` SET ${updates} WHERE id = ${id};`;
    await prisma.$executeRawUnsafe(sql);

    res.json({ message: "Record updated successfully" });
  } catch (err) {
    console.error("❌ Update Error:", err);
    res.status(500).json({ error: String(err) });
  }
},

  async remove(req: Request, res: Response, model: any) {
  try {
    const id = req.params.id;
    const table = model.tableName || model.name.toLowerCase() + "s";

    console.log("🗑️ Deleting from:", table, "ID:", id);

    // ⚠️ Prisma $executeRawUnsafe ke saath raw SQL delete
    const sql = `DELETE FROM \`${table}\` WHERE id = ${id};`;
    await prisma.$executeRawUnsafe(sql);

    res.json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Error:", err);
    res.status(500).json({ error: String(err) });
  }
}

};
