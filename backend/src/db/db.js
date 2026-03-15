import knex from "knex";
import config from "../../knexfile.js";

const db = knex(config.development);

// await db.raw("SELECT 1");
// console.log("Neon connected successfully");

export default db;