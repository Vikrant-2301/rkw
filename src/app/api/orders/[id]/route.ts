import { NextRequest, NextResponse } from 'next/server';
import { getOrdersCollection } from '@/lib/mongodb';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { status, adminNotes } = body;

    const ordersCol = await getOrdersCollection();
    const updateFields: Record<string, unknown> = { updatedAt: new Date() };

    if (status) updateFields.status = status;
    if (typeof adminNotes === 'string') updateFields.adminNotes = adminNotes;

    const result = await ordersCol.updateOne(
      { orderId: id },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, updated: updateFields });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const ordersCol = await getOrdersCollection();
    const order = await ordersCol.findOne({ orderId: id });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
