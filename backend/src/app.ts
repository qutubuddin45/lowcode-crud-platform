import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { loadAndRegisterAll } from "./routes/dynamicRouter";
import authMiddleware from "./middleware/auth";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(express.json());

// ✅ Public routes (no auth required)
app.use("/api/auth", authRoutes);

// ✅ Protected routes (auth required)
app.use(authMiddleware);
app.use("/api/admin", adminRoutes);

// ✅ Dynamic model routes (auto load models)
loadAndRegisterAll(app)
  .then(() => console.log("✅ Dynamic model routes loaded successfully"))
  .catch((err) => console.error("❌ Error loading models:", err));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚀 Server running successfully!");
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error("🔥 Internal Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
