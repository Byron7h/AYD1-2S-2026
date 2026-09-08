// src/repositories/ProductRepository.ts

import { PrismaClient, Product } from "@prisma/client";
import { IProductRepository } from "../interfaces";

const prisma = new PrismaClient();

export class PrismaProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  async findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  async create(data: { name: string; price: number; stock: number }): Promise<Product> {
    return prisma.product.create({ data });
  }

  async updateStock(id: number, newStock: number): Promise<Product> {
    return prisma.product.update({ where: { id }, data: { stock: newStock } });
  }
}
