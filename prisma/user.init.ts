import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prismaClient = new PrismaClient();

const users = [
  {
    name: "Hien Pham",
    email: "hienpg0310@gmail.com",
    password: "123456",
  },
  {
    name: "Vinh Phan",
    email: "vinhphan@techfis.com",
    password: "vinhphan123",
  },
  {
    name: "Khoa Nguyen",
    email: "khoanguyen@techfis.com",
    password: "khoanguyen123",
  },
  // Add more users here
];

async function initializeUsers() {
  try {
    for (const user of users) {
      const existingUser = await prismaClient.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        console.log(`User ${user.email} already exists.`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      await prismaClient.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          isVerified: true,
          isActivated: true,
        },
      });

      console.log(`User ${user.email} created successfully.`);
    }
  } catch (error) {
    console.error("Error initializing users:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}

initializeUsers()
  .then(() => console.log("All user initialization complete."))
  .catch((error) => console.error("Error during users initialization:", error));
