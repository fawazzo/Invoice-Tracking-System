import { pgTable, uuid, integer, text, timestamp } from "drizzle-orm/pg-core";

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  customerNo: integer("customer_no").notNull(),
  description: text("description").notNull(),
});
