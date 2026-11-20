import { NextRequest, NextResponse } from 'next/server';
import { getCouponsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const couponsCol = await getCouponsCollection();

    let query: Record<string, unknown> = { code: id.toUpperCase() };
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { code: id.toUpperCase() }] };
    }

    const updateFields: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (typeof body.isActive === 'boolean') updateFields.isActive = body.isActive;
    if (body.discountType) updateFields.discountType = body.discountType;
    if (typeof body.discountValue === 'number') updateFields.discountValue = body.discountValue;
    if (typeof body.minOrderValue === 'number') updateFields.minOrderValue = body.minOrderValue;
    if (body.maxDiscountCap !== undefined) updateFields.maxDiscountCap = body.maxDiscountCap;
    if (body.expiryDate !== undefined) updateFields.expiryDate = body.expiryDate;
    if (body.usageLimit !== undefined) updateFields.usageLimit = body.usageLimit;

    const result = await couponsCol.updateOne(query, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    const updated = await couponsCol.findOne(query);

    return NextResponse.json({
      success: true,
      message: 'Coupon updated successfully',
      coupon: updated ? { ...updated, _id: updated._id.toString() } : null,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const couponsCol = await getCouponsCollection();

    let query: Record<string, unknown> = { code: id.toUpperCase() };
    if (ObjectId.isValid(id)) {
      query = { $or: [{ _id: new ObjectId(id) }, { code: id.toUpperCase() }] };
    }

    const result = await couponsCol.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
