import { NextRequest, NextResponse } from 'next/server';
import { getCouponsCollection } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, subtotal = 0 } = body;

    const cleanCode = (code || '').trim().toUpperCase();

    if (!cleanCode) {
      return NextResponse.json({ success: false, message: 'Please enter a coupon code.' }, { status: 400 });
    }

    const couponsCol = await getCouponsCollection();
    const coupon = await couponsCol.findOne({ code: cleanCode });

    if (!coupon) {
      return NextResponse.json({ success: false, message: 'Invalid or unrecognized coupon code.' }, { status: 404 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ success: false, message: 'This coupon is currently inactive.' }, { status: 400 });
    }

    // Check expiry
    if (coupon.expiryDate) {
      const expDate = new Date(coupon.expiryDate);
      // set to end of day
      expDate.setHours(23, 59, 59, 999);
      if (new Date() > expDate) {
        return NextResponse.json({ success: false, message: 'This coupon has expired.' }, { status: 400 });
      }
    }

    // Check usage limit
    if (coupon.usageLimit && typeof coupon.usageLimit === 'number') {
      if ((coupon.usageCount || 0) >= coupon.usageLimit) {
        return NextResponse.json({ success: false, message: 'Coupon usage limit has been reached.' }, { status: 400 });
      }
    }

    // Check minimum order value
    const numericSubtotal = Number(subtotal) || 0;
    if (coupon.minOrderValue && numericSubtotal < coupon.minOrderValue) {
      return NextResponse.json({
        success: false,
        message: `Minimum order value of ₹${coupon.minOrderValue} required for this coupon (Current: ₹${numericSubtotal}).`,
      }, { status: 400 });
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((numericSubtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscountCap && coupon.maxDiscountCap > 0) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscountCap);
      }
    } else {
      // Fixed flat discount
      discountAmount = Math.min(numericSubtotal, coupon.discountValue);
    }

    const descMsg =
      coupon.discountType === 'percentage'
        ? `${coupon.discountValue}% discount applied! Saved ₹${discountAmount}`
        : `Flat ₹${discountAmount} discount applied!`;

    return NextResponse.json({
      success: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount,
      message: descMsg,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
