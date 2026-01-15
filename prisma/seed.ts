import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL environment variable. Make sure .env.local exists and contains DATABASE_URL');
}

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the adapter
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const initialCoupons = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    description: '10% off your first month',
    validFrom: new Date(),
    validUntil: null, // No expiration
    maxUses: 1000,
    currentUses: 0,
    isActive: true,
  },
  {
    code: 'SAVE20',
    discountType: 'percentage',
    discountValue: 20,
    description: '20% off your subscription',
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    maxUses: 500,
    currentUses: 0,
    isActive: true,
  },
  {
    code: 'FIRST50',
    discountType: 'fixed',
    discountValue: 50,
    description: '$50 off your first year',
    validFrom: new Date(),
    validUntil: null,
    maxUses: 100,
    currentUses: 0,
    isActive: true,
  },
];

async function main() {
  console.log('🌱 Starting coupon seed...');

  try {
    // Check if coupons already exist
    const existingCoupons = await prisma.coupon.findMany({
      select: { code: true },
    });

    if (existingCoupons.length > 0) {
      console.log('⚠️  Coupons already exist in the database.');
      console.log('   Existing coupons:', existingCoupons.map(c => c.code).join(', '));
      console.log('   Skipping seed. Delete existing coupons first if you want to re-seed.');
      return;
    }

    // Insert coupons
    const createdCoupons = await Promise.all(
      initialCoupons.map((coupon) =>
        prisma.coupon.create({
          data: coupon,
        })
      )
    );

    console.log('✅ Successfully seeded coupons:');
    createdCoupons.forEach((coupon) => {
      console.log(`   - ${coupon.code}: ${coupon.description}`);
    });
    console.log(`\n📊 Total coupons created: ${createdCoupons.length}`);
  } catch (error) {
    console.error('❌ Error seeding coupons:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Unexpected error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
