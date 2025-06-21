import { Hono } from "hono";
import { cors } from 'hono/cors';
import invoiceRoutes from "./routes/invoices";
import { logger } from "hono/logger";
import "dotenv/config";
// @ts-ignore
import { serve } from "@hono/node-server";


const app = new Hono();
// Enable CORS for all routes
app.use('*', cors({
  origin: 'http://localhost:5173', // ✅ allow frontend origin
}));
app.route("/invoices", invoiceRoutes);

serve({ fetch: app.fetch, port: 3000 });
console.log("🚀 Server running on http://localhost:3000");
