import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const email = (args[0] || process.env.ADMIN_EMAIL || "editorial@cyberlex.io").toLowerCase().trim();
  const password = args[1] || process.env.ADMIN_PASSWORD || "CyberLex2026!Admin";
  const name = args[2] || "CyberLex Lead Editor";
  const role = (args[3]?.toUpperCase() as UserRole) || UserRole.ADMIN;

  console.log("--------------------------------------------------");
  console.log(" CyberLex Safe Admin Account Provisioning Tool    ");
  console.log("--------------------------------------------------");
  console.log(`Target Email: ${email}`);
  console.log(`Role:         ${role}`);
  console.log(`Name:         ${name}`);

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role,
      name,
    },
    create: {
      email,
      name,
      passwordHash,
      role,
      bio: "Editorial board member with CMS administrative access.",
      organization: "CyberLex Editorial Board",
    },
  });

  console.log("--------------------------------------------------");
  console.log(`SUCCESS: User [${user.email}] successfully provisioned with role [${user.role}].`);
  console.log("Admin account is active and can login at /admin/login.");
  console.log("--------------------------------------------------");
}

main()
  .catch((err) => {
    console.error("Failed to provision admin account:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
