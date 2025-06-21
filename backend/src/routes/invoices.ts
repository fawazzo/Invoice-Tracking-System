import { Hono } from "hono";
import { db } from "../db";
import { invoices } from "../db/schema";
import { eq } from "drizzle-orm";

const invoiceRoutes = new Hono();

invoiceRoutes.post("/", async (c) => {
  const { customerNo, description } = await c.req.json();
  const result = await db.insert(invoices).values({ customerNo, description }).returning();
  return c.json(result[0]);
});

invoiceRoutes.get("/", async (c) => {
  const result = await db.select().from(invoices);
  return c.json(result);
});

invoiceRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await db.select().from(invoices).where(eq(invoices.id, id));
  if (result.length === 0) return c.notFound();
  return c.json(result[0]);
});

invoiceRoutes.put("/:id", async (c) => {
  const id = c.req.param("id");
  const { customerNo, description } = await c.req.json();
  const result = await db.update(invoices)
    .set({ customerNo, description })
    .where(eq(invoices.id, id))
    .returning();
  return c.json(result[0]);
});

invoiceRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await db.delete(invoices).where(eq(invoices.id, id));
  return c.json({ message: "Invoice deleted" });
});

export default invoiceRoutes;
