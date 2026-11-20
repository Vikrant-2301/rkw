import { NextRequest, NextResponse } from 'next/server';
import { getOrdersCollection } from '@/lib/mongodb';
import { syncOrderToGoogleSheet } from '@/lib/googleSheet';
import { sendOrderEmails } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      address,
      city = 'Delhi',
      state = 'Delhi',
      pincode = '110034',
      items = [],
      subtotal = 0,
      discount = 0,
      shippingFee = 0,
      total = 0,
      paymentMethod = 'Pay on Delivery / Call Confirmation',
      couponCode = '',
      notes = '',
    } = body;

    if (!customerName || !phone || !address || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required customer details or cart items' },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number' },
        { status: 400 }
      );
    }

    // Generate unique human-readable Order ID: RKW-YYYY-XXXXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.floor(100000 + Math.random() * 900000).toString();
    const orderId = `RKW-${dateStr}-${randomHex}`;

    const formattedDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Create item summary string for Google Sheet & notifications
    const itemsSummary = items
      .map((it: { name: string; size?: string; quantity: number; price: number }) => {
        return `${it.name} (${it.size || 'Standard'}) x${it.quantity} @ ₹${it.price}`;
      })
      .join('; ');

    const newOrder = {
      orderId,
      customerName,
      phone,
      email: email || '',
      address,
      city,
      state,
      pincode,
      items,
      itemsSummary,
      subtotal: Number(subtotal),
      discount: Number(discount),
      shippingFee: Number(shippingFee),
      total: Number(total),
      paymentMethod,
      couponCode: couponCode ? String(couponCode).toUpperCase() : '',
      notes,
      status: 'pending_confirmation',
      createdAt: new Date(),
      dateFormatted: formattedDate,
      googleSheetSynced: false,
      emailsDispatched: false,
    };

    // 1. Save to MongoDB Database (Collection: orders in DB: rkw)
    const ordersCol = await getOrdersCollection();
    await ordersCol.insertOne(newOrder);

    // Track coupon usage if a coupon was used
    if (couponCode) {
      try {
        const { getCouponsCollection } = await import('@/lib/mongodb');
        const couponsCol = await getCouponsCollection();
        await couponsCol.updateOne(
          { code: String(couponCode).toUpperCase() },
          {
            $inc: { usageCount: 1 },
            $push: {
              usedBy: {
                orderId,
                customerName,
                phone: cleanPhone,
                discountAmount: Number(discount) || 0,
                usedAt: new Date(),
              },
            } as any,
          }
        );
      } catch (err) {
        console.error('Failed to log coupon usage:', err);
      }
    }

    // 2. Sync to Google Sheet (non-blocking)
    syncOrderToGoogleSheet({
      orderId,
      date: formattedDate,
      customerName,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      itemsSummary,
      subtotal: Number(subtotal),
      shippingFee: Number(shippingFee),
      total: Number(total),
      paymentMethod,
      status: 'Pending Confirmation',
      notes,
    })
      .then(async res => {
        if (res.success) {
          await ordersCol.updateOne({ orderId }, { $set: { googleSheetSynced: true } });
        }
      })
      .catch(err => {
        console.error('Background Google Sheet sync error:', err);
      });

    // 3. Send Confirmation Emails to User & Store Admin (non-blocking)
    sendOrderEmails({
      orderId,
      customerName,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      items: items.map((it: { name: string; size?: string; quantity: number; price: number }) => ({
        name: it.name,
        size: it.size || 'Standard',
        quantity: it.quantity,
        price: it.price,
        total: it.quantity * it.price,
      })),
      subtotal: Number(subtotal),
      shippingFee: Number(shippingFee),
      total: Number(total),
      paymentMethod,
      date: formattedDate,
    })
      .then(async res => {
        await ordersCol.updateOne(
          { orderId },
          { $set: { emailsDispatched: res.customerSent || res.adminSent } }
        );
      })
      .catch(err => {
        console.error('Background email dispatch error:', err);
      });

    return NextResponse.json({
      success: true,
      orderId,
      date: formattedDate,
      message: 'Your order has been accepted. Our customer care will contact you to confirm the order.',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to create order:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const ordersCol = await getOrdersCollection();
    const orders = await ordersCol
      .find(query)
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ success: true, orders });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to fetch orders:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
