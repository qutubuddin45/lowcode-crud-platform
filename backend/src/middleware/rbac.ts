import { Request, Response, NextFunction } from "express";

export function rbacMiddleware(model: any, action: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user: any = (req as any).user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const rbac = model.rbac || {};

    // 🟢 Handle both: single role or multiple roles
    const userRoles = Array.isArray(user.roles)
      ? user.roles
      : [user.role || "Viewer"];

    // 🧩 Check permissions for each role
    for (const role of userRoles) {
      const perms = rbac[role];
      if (!perms) continue;
      if (perms.includes("all")) return next();
      if (perms.includes(action)) return next();
    }

    // ⚙️ Ownership check for update/delete if defined
    if ((action === "update" || action === "delete") && model.ownerField) {
      // Ownership check will happen in controller
      return next();
    }

    // ❌ No permission found
    return res.status(403).json({ error: "Forbidden" });
  };
}
