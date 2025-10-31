import dotenv from "dotenv";
require("dotenv").config()
import app from "./app";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
console.log("Database URL:", process.env.DATABASE_URL);

