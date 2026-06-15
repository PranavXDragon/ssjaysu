import { db } from "./db";
import {
  products,
  orders,
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
} from "@shared/schema";
import { eq } from "drizzle-orm";

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "The Royal Princess",
    description:
      "A stunning princess-cut diamond set in 18k white gold, surrounded by a halo of smaller diamonds.",
    price: "4500.00",
    imageUrl:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Engagement",
    metalType: "Gold",
    caratWeight: "1.5",
    clarity: "VVS1",
    color: "E",
    cut: "Princess",
    rating: "4.9",
    reviewsCount: 124,
  },
  {
    id: 2,
    name: "Eternal Love Band",
    description:
      "A classic eternity band featuring brilliant-cut diamonds encircling the entire ring.",
    price: "2800.00",
    imageUrl:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Wedding",
    metalType: "Platinum",
    caratWeight: "2.0",
    clarity: "VS1",
    color: "F",
    cut: "Round",
    rating: "4.8",
    reviewsCount: 89,
  },
  {
    id: 3,
    name: "Rose Gold Solitaire",
    description:
      "A minimalist solitaire diamond ring set in a warm rose gold band.",
    price: "3200.00",
    imageUrl:
      "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Engagement",
    metalType: "Gold",
    caratWeight: "1.2",
    clarity: "VVS2",
    color: "G",
    cut: "Round",
    rating: "5.0",
    reviewsCount: 210,
  },
];

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db!.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db!
      .select()
      .from(products)
      .where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db!.insert(products).values(product).returning();
    return newProduct;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db!.insert(orders).values(order).returning();
    return newOrder;
  }
}

export class InMemoryStorage implements IStorage {
  private products = fallbackProducts.map((product) => ({ ...product }));
  private orders: Order[] = [];

  async getProducts(): Promise<Product[]> {
    return this.products.map((product) => ({ ...product }));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.find((product) => product.id === id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const nextId = this.products.length
      ? Math.max(...this.products.map((item) => item.id)) + 1
      : 1;

    const newProduct = {
      id: nextId,
      ...product,
    } as Product;

    this.products.push(newProduct);
    return newProduct;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const newOrder = {
      id: this.orders.length + 1,
      status: "pending",
      ...order,
    } as Order;

    this.orders.push(newOrder);
    return newOrder;
  }
}

export const storage = db ? new DatabaseStorage() : new InMemoryStorage();
