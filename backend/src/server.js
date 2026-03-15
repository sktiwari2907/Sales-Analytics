import dotenv from "dotenv";
dotenv.config();
import app  from "./app.js";
import db from "./db/db.js";

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    console.log("DATABASE_URL:", process.env.DATABASE_URL); // must print full Neon URL
  
    try {
      await db.raw("SELECT 1");
      console.log("✅ Connected to Neon successfully");
    } catch (err) {
      console.error("❌ Neon connection failed:", err);
    }
});