import { NextRequest, NextResponse } from 'next/server';
import { getProductsCollection } from '@/lib/mongodb';
import { PRODUCTS } from '@/data/products';

export async function GET() {
  try {
    const productsCol = await getProductsCollection();
    let dbProducts = await productsCol.find({}).toArray();

    // Auto-seed if database collection is empty
    if (dbProducts.length === 0) {
      console.log('Seeding products collection from PRODUCTS data...');
      await productsCol.insertMany(
        PRODUCTS.map(p => ({
          ...p,
          updatedAt: new Date(),
        }))
      );
      dbProducts = await productsCol.find({}).toArray();
    }

    return NextResponse.json({ success: true, products: dbProducts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to fetch products from DB, fallback to local data:', message);
    return NextResponse.json({ success: true, products: PRODUCTS, fallback: true });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, price, originalPrice, inStock, volumes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
    }

    const productsCol = await getProductsCollection();

    const updateFields: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (typeof price === 'number') updateFields.price = price;
    if (typeof originalPrice === 'number') updateFields.originalPrice = originalPrice;
    if (typeof inStock === 'boolean') updateFields.inStock = inStock;
    if (Array.isArray(volumes)) updateFields.volumes = volumes;

    const result = await productsCol.updateOne({ id }, { $set: updateFields });

    if (result.matchedCount === 0) {
      // If product not in DB yet, find in PRODUCTS and insert with new prices
      const localProd = PRODUCTS.find(p => p.id === id);
      if (localProd) {
        await productsCol.insertOne({
          ...localProd,
          ...updateFields,
        });
      } else {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
    }

    const updatedDoc = await productsCol.findOne({ id });
    return NextResponse.json({ success: true, product: updatedDoc });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error updating product:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action } = body;

    if (action === 'seed' || action === 'reset') {
      const productsCol = await getProductsCollection();
      await productsCol.deleteMany({});
      await productsCol.insertMany(
        PRODUCTS.map(p => ({
          ...p,
          updatedAt: new Date(),
        }))
      );
      const count = await productsCol.countDocuments();
      return NextResponse.json({ success: true, message: `Successfully seeded ${count} products` });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
