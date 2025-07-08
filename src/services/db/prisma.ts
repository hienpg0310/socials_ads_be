import { PrismaClient } from "@prisma/client";

// single prisma using between files
export const prisma = new PrismaClient();