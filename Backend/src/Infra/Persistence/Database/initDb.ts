import { testConnection, syncDatabase } from './orm';
import { defineAssociations } from "./orm/link";

async function initDb() {
  try {
    console.log("Connecting to database...");
    await testConnection();
    
    console.log("Creating database tables...");
    await defineAssociations();
    await syncDatabase(true); // true = force recréation des tables
    
    console.log("Database initialized successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

initDb();