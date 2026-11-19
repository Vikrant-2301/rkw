import { NextRequest, NextResponse } from 'next/server';
import { getProductsCollection } from '@/lib/mongodb';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

// In-memory store fallback so stock and pricing changes always persist in memory even if DB is unavailable
let memoryProducts: Product[] = PRODUCTS.map(p => ({
  ...p,
  inStock: p.inStock ?? true,
  bestSeller: p.bestSeller ?? false,
  isSpecialOffer: p.isSpecialOffer ?? false,
  specialOffer: p.specialOffer || '',
  volumes: p.volumes.map(v => ({
    ...v,
    inStock: v.inStock ?? true,
  })),
}));

export async function GET() {
  try {
    const productsCol = await getProductsCollection();
    let dbProducts = (await productsCol.find({}).toArray()) as unknown as Product[];

    // Auto-seed if database collection is empty
    if (dbProducts.length === 0) {
      console.log('Seeding products collection from PRODUCTS data...');
      await productsCol.insertMany(
        memoryProducts.map(p => ({
          ...p,
          updatedAt: new Date(),
        }))
      );
      dbProducts = (await productsCol.find({}).toArray()) as unknown as Product[];
    }

    if (Array.isArray(dbProducts) && dbProducts.length > 0) {
      // Sync memory cache
      memoryProducts = dbProducts.map(p => ({
        ...p,
        inStock: p.inStock ?? true,
        volumes: (p.volumes || []).map(v => ({
          ...v,
          inStock: v.inStock ?? true,
        })),
      }));
      return NextResponse.json({ success: true, products: dbProducts });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('MongoDB unreachable or failed, serving in-memory products:', message);
  }

  return NextResponse.json({ success: true, products: memoryProducts, fallback: true });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      action,
      volumeSize,
      name,
      hindiName,
      category,
      shortDesc,
      description,
      image,
      bottleImage,
      showcaseImage,
      price,
      originalPrice,
      inStock,
      volumes,
      bestSeller,
      featured,
      isSpecialOffer,
      specialOffer,
      specialDiscountPercent,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
    }

    // Find current product in memory
    const existingIndex = memoryProducts.findIndex(p => p.id === id);
    const existing = existingIndex > -1 ? memoryProducts[existingIndex] : PRODUCTS.find(p => p.id === id);

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updatedProduct: Product = {
      ...existing,
      volumes: [...(existing.volumes || [])],
    };

    // Quick Action 1: Toggle whole product stock
    if (action === 'toggle_product_stock') {
      updatedProduct.inStock = !Boolean(updatedProduct.inStock);
    }
    // Quick Action 2: Toggle specific volume stock
    else if (action === 'toggle_volume_stock' && volumeSize) {
      updatedProduct.volumes = updatedProduct.volumes.map(v => {
        if (v.size === volumeSize) {
          const current = v.inStock !== false;
          return { ...v, inStock: !current };
        }
        return v;
      });
    }
    // Quick Action 3: Set specific volume stock
    else if (action === 'set_volume_stock' && volumeSize && typeof inStock === 'boolean') {
      updatedProduct.volumes = updatedProduct.volumes.map(v => {
        if (v.size === volumeSize) {
          return { ...v, inStock };
        }
        return v;
      });
    }
    // Quick Action 4: Toggle Best Seller (Most Selling)
    else if (action === 'toggle_bestseller') {
      updatedProduct.bestSeller = !Boolean(updatedProduct.bestSeller);
    }
    // Quick Action 5: Toggle Special Offer
    else if (action === 'toggle_special_offer') {
      updatedProduct.isSpecialOffer = !Boolean(updatedProduct.isSpecialOffer);
      if (updatedProduct.isSpecialOffer && !updatedProduct.specialOffer) {
        updatedProduct.specialOffer = 'Special Deal';
      }
    }
    // Full update
    else {
      if (typeof name === 'string' && name.trim()) updatedProduct.name = name.trim();
      if (typeof hindiName === 'string') updatedProduct.hindiName = hindiName.trim();
      if (typeof category === 'string') updatedProduct.category = category as any;
      if (typeof shortDesc === 'string') updatedProduct.shortDesc = shortDesc;
      if (typeof description === 'string') updatedProduct.description = description;
      if (typeof image === 'string' && image.trim()) updatedProduct.image = image.trim();
      if (typeof bottleImage === 'string') updatedProduct.bottleImage = bottleImage;
      if (typeof showcaseImage === 'string') updatedProduct.showcaseImage = showcaseImage;
      if (typeof price === 'number') updatedProduct.price = price;
      if (typeof originalPrice === 'number') updatedProduct.originalPrice = originalPrice;
      if (typeof inStock === 'boolean') updatedProduct.inStock = inStock;
      if (typeof bestSeller === 'boolean') updatedProduct.bestSeller = bestSeller;
      if (typeof featured === 'boolean') updatedProduct.featured = featured;
      if (typeof isSpecialOffer === 'boolean') updatedProduct.isSpecialOffer = isSpecialOffer;
      if (typeof specialOffer === 'string') updatedProduct.specialOffer = specialOffer;
      if (typeof specialDiscountPercent === 'number') updatedProduct.specialDiscountPercent = specialDiscountPercent;
      if (Array.isArray(volumes)) {
        updatedProduct.volumes = volumes.map(v => ({
          ...v,
          inStock: v.inStock !== false,
        }));
      }
    }

    // Update in-memory cache
    if (existingIndex > -1) {
      memoryProducts[existingIndex] = updatedProduct;
    } else {
      memoryProducts.push(updatedProduct);
    }

    // Attempt to persist to MongoDB
    try {
      const productsCol = await getProductsCollection();
      const updateFields: Record<string, unknown> = {
        updatedAt: new Date(),
        name: updatedProduct.name,
        hindiName: updatedProduct.hindiName,
        category: updatedProduct.category,
        shortDesc: updatedProduct.shortDesc,
        description: updatedProduct.description,
        image: updatedProduct.image,
        bottleImage: updatedProduct.bottleImage,
        showcaseImage: updatedProduct.showcaseImage,
        inStock: updatedProduct.inStock,
        volumes: updatedProduct.volumes,
        price: updatedProduct.price,
        originalPrice: updatedProduct.originalPrice,
        bestSeller: updatedProduct.bestSeller,
        featured: updatedProduct.featured,
        isSpecialOffer: updatedProduct.isSpecialOffer,
        specialOffer: updatedProduct.specialOffer,
        specialDiscountPercent: updatedProduct.specialDiscountPercent,
      };

      const result = await productsCol.updateOne({ id }, { $set: updateFields });
      if (result.matchedCount === 0) {
        await productsCol.insertOne({
          ...updatedProduct,
          ...updateFields,
        });
      }
      const updatedDoc = await productsCol.findOne({ id });
      return NextResponse.json({ success: true, product: updatedDoc || updatedProduct });
    } catch (dbErr) {
      console.warn('MongoDB update skipped, saved in-memory:', dbErr);
      return NextResponse.json({ success: true, product: updatedProduct, fallback: true });
    }
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
      memoryProducts = PRODUCTS.map(p => ({
        ...p,
        inStock: true,
        volumes: p.volumes.map(v => ({ ...v, inStock: true })),
      }));

      try {
        const productsCol = await getProductsCollection();
        await productsCol.deleteMany({});
        await productsCol.insertMany(
          memoryProducts.map(p => ({
            ...p,
            updatedAt: new Date(),
          }))
        );
        const count = await productsCol.countDocuments();
        return NextResponse.json({ success: true, message: `Successfully seeded ${count} products` });
      } catch (dbErr) {
        console.warn('MongoDB reset skipped, reset in-memory:', dbErr);
        return NextResponse.json({ success: true, message: `Successfully reset in-memory products`, fallback: true });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
