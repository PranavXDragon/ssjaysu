import { pgTable, text, serial, integer, numeric, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // Engagement, Wedding, Fashion
  metalType: text("metal_type").notNull(), // Gold, Platinum, Silver
  caratWeight: text("carat_weight"),
  clarity: text("clarity"),
  color: text("color"),
  cut: text("cut"),
  rating: numeric("rating").default("5.0"),
  reviewsCount: integer("reviews_count").default(0),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  total: numeric("total").notNull(),
  status: text("status").notNull().default("pending"),
  items: jsonb("items").notNull(), // Store cart items as JSON
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, status: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
