// import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";
// import { drizzle } from "drizzle-orm/neon-http";

// config({ path: ".env" }); // or .env.local

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql });

import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as schema from "./schema";

export const db = drizzle(sql, { schema });
