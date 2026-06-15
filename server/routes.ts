import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { products } from "@shared/schema";

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    const seedProducts = [
      {
        name: "The Royal Princess",
        description: "A stunning princess-cut diamond set in 18k white gold, surrounded by a halo of smaller diamonds.",
        price: "4500.00",
        imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Engagement",
        metalType: "Gold",
        caratWeight: "1.5",
        clarity: "VVS1",
        color: "E",
        cut: "Princess",
        rating: "4.9",
        reviewsCount: 124
      },
      {
        name: "Eternal Love Band",
        description: "A classic eternity band featuring brilliant-cut diamonds encircling the entire ring.",
        price: "2800.00",
        imageUrl: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Wedding",
        metalType: "Platinum",
        caratWeight: "2.0",
        clarity: "VS1",
        color: "F",
        cut: "Round",
        rating: "4.8",
        reviewsCount: 89
      },
      {
        name: "Rose Gold Solitaire",
        description: "A minimalist solitaire diamond ring set in a warm rose gold band.",
        price: "3200.00",
        imageUrl: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Engagement",
        metalType: "Gold",
        caratWeight: "1.2",
        clarity: "VVS2",
        color: "G",
        cut: "Round",
        rating: "5.0",
        reviewsCount: 210
      },
      {
        name: "Sapphire & Diamond Halo",
        description: "A magnificent blue sapphire surrounded by a halo of sparkling diamonds.",
        price: "5600.00",
        imageUrl: "https://images.unsplash.com/photo-1588444650733-d0767b753fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Fashion",
        metalType: "Silver",
        caratWeight: "2.5",
        clarity: "VS2",
        color: "H",
        cut: "Oval",
        rating: "4.7",
        reviewsCount: 56
      },
      {
        name: "Vintage Art Deco",
        description: "An intricate vintage-inspired design with detailed milgrain work.",
        price: "6200.00",
        imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Engagement",
        metalType: "Platinum",
        caratWeight: "1.8",
        clarity: "VVS1",
        color: "D",
        cut: "Emerald",
        rating: "4.9",
        reviewsCount: 78
      },
      {
        name: "Modern Tension Set",
        description: "A contemporary tension-set ring that appears to float the diamond in mid-air.",
        price: "3900.00",
        imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Fashion",
        metalType: "Gold",
        caratWeight: "1.0",
        clarity: "IF",
        color: "D",
        cut: "Round",
        rating: "4.6",
        reviewsCount: 45
      },
      {
        name: "Three-Stone Past Present Future",
        description: "Three brilliant round diamonds representing your past, present, and future.",
        price: "7500.00",
        imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Engagement",
        metalType: "Gold",
        caratWeight: "3.0",
        clarity: "VVS2",
        color: "E",
        cut: "Round",
        rating: "5.0",
        reviewsCount: 156
      },
      {
        name: "Pear Shaped Halo",
        description: "A unique pear-shaped diamond surrounded by a glittering halo.",
        price: "4800.00",
        imageUrl: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Engagement",
        metalType: "Gold",
        caratWeight: "1.4",
        clarity: "VS1",
        color: "F",
        cut: "Pear",
        rating: "4.8",
        reviewsCount: 92
      },
      {
        name: "Men's Classic Band",
        description: "A timeless and durable platinum wedding band for him.",
        price: "1500.00",
        imageUrl: "https://images.unsplash.com/photo-1598560917505-59c367dfd288?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Wedding",
        metalType: "Platinum",
        caratWeight: "0.0",
        clarity: "N/A",
        color: "N/A",
        cut: "N/A",
        rating: "4.9",
        reviewsCount: 67
      },
      {
        name: "Twisted Pavé Band",
        description: "A delicate twisted band adorned with pavé-set diamonds.",
        price: "2200.00",
        imageUrl: "https://images.unsplash.com/photo-1596944924616-00311a638840?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Wedding",
        metalType: "Gold",
        caratWeight: "0.5",
        clarity: "VS2",
        color: "G",
        cut: "Round",
        rating: "4.7",
        reviewsCount: 112
      },
      {
        name: "Radiant Cut Solitaire",
        description: "A bold radiant-cut diamond on a sleek gold band.",
        price: "5100.00",
        imageUrl: "https://images.unsplash.com/photo-1586104139863-7e61d7634289?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Engagement",
        metalType: "Gold",
        caratWeight: "1.7",
        clarity: "VVS2",
        color: "F",
        cut: "Radiant",
        rating: "4.8",
        reviewsCount: 88
      },
      {
        name: "Diamond Stud Earrings",
        description: "Classic round diamond studs, a staple for every jewelry collection.",
        price: "1800.00",
        imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "Fashion",
        metalType: "Gold",
        caratWeight: "1.0",
        clarity: "VS1",
        color: "H",
        cut: "Round",
        rating: "4.9",
        reviewsCount: 345
      }
    ];

    for (const product of seedProducts) {
      await storage.createProduct(product);
    }
    console.log("Database seeded with products");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed database on startup
  seedDatabase().catch(console.error);

  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
