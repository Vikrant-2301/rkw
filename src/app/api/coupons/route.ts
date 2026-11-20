import { NextRequest, NextResponse } from 'next/server';
import { getCouponsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const couponsCol = await getCouponsCollection();
    const coupons = await couponsCol.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      coupons: coupons.map(c => ({
        ...c,
        _id: c._id.toString(),
      })),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      code,
      discountType = 'percentage',
      discountValue,
      minOrderValue = 0,
      maxDiscountCap = null,
      expiryDate = null,
      usageLimit = null,
      isActive = true,
    } = body;

    const cleanCode = (code || '').trim().toUpperCase();

    if (!cleanCode) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    if (!discountValue || Number(discountValue) <= 0) {
      return NextResponse.json({ error: 'Discount value must be greater than 0' }, { status: 400 });
    }

    const couponsCol = await getCouponsCollection();

    // Check if code already exists
    const existing = await couponsCol.findOne({ code: cleanCode });
    if (existing) {
      return NextResponse.json({ error: `Coupon code '${cleanCode}' already exists` }, { status: 409 });
    }

    const newCoupon = {
      code: cleanCode,
      discountType: discountType === 'fixed' ? 'fixed' : 'percentage',
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue) || 0,
      maxDiscountCap: maxDiscountCap ? Number(maxDiscountCap) : null,
      expiryDate: expiryDate || null,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      usageCount: 0,
      isActive: Boolean(isActive),
      usedBy: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await couponsCol.insertOne(newCoupon);

    return NextResponse.json({
      success: true,
      message: `Coupon ${cleanCode} created successfully!`,
      coupon: {
        ...newCoupon,
        _id: result.insertedId.toString(),
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');
    const id = searchParams.get('id');
    const couponsCol = await getCouponsCollection();

    // Clear all coupons
    if (action === 'clear_all') {
      const result = await couponsCol.deleteMany({});
      return NextResponse.json({
        success: true,
        message: `Cleared all ${result.deletedCount} coupons from the database.`,
      });
    }

    if (id) {
      let query: Record<string, unknown> = { code: id.toUpperCase() };
      if (ObjectId.isValid(id)) {
        query = { $or: [{ _id: new ObjectId(id) }, { code: id.toUpperCase() }] };
      }
      await couponsCol.deleteOne(query);
      return NextResponse.json({ success: true, message: 'Coupon deleted successfully.' });
    }

    return NextResponse.json({ error: 'Missing action or id' }, { status: 400 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
