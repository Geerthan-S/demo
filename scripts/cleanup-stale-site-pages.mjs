/**
 * cleanup-stale-site-pages.mjs
 * One-off script: deletes stale SitePage rows from the database.
 * Run with: node scripts/cleanup-stale-site-pages.mjs
 */

import { PrismaClient } from "@prisma/client";

const STALE_SLUGS = [
  "service-commercial-construction",
  "service-industrial-construction",
  "service-interior-solutions",
  "service-renovation-services",
  "service-residential-construction",
  "testimonials",
];

const prisma = new PrismaClient();

async function main() {
  console.log("🗑  Deleting stale site pages...\n");

  const result = await prisma.sitePage.deleteMany({
    where: { slug: { in: STALE_SLUGS } },
  });

  console.log(`✅  Deleted ${result.count} stale site page(s):`);
  STALE_SLUGS.forEach((slug) => console.log(`   - ${slug}`));
}

main()
  .catch((err) => {
    console.error("❌  Error:", err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
