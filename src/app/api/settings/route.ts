import { NextRequest, NextResponse } from 'next/server';
import { getSettingsCollection } from '@/lib/mongodb';
import { GOOGLE_APPS_SCRIPT_TEMPLATE, syncOrderToGoogleSheet } from '@/lib/googleSheet';

export async function GET() {
  try {
    const settingsCol = await getSettingsCollection();
    const sheetDoc = await settingsCol.findOne({ key: 'google_sheet_config' });
    const emailDoc = await settingsCol.findOne({ key: 'email_config' });

    return NextResponse.json({
      success: true,
      googleSheet: {
        webhookUrl: sheetDoc?.webhookUrl || process.env.GOOGLE_SHEET_WEBHOOK_URL || '',
        scriptTemplate: GOOGLE_APPS_SCRIPT_TEMPLATE,
      },
      emailConfig: {
        smtpHost: emailDoc?.smtpHost || process.env.SMTP_HOST || '',
        smtpPort: emailDoc?.smtpPort || process.env.SMTP_PORT || '587',
        smtpUser: emailDoc?.smtpUser || process.env.SMTP_USER || '',
        smtpFrom: emailDoc?.smtpFrom || process.env.SMTP_FROM || '"Ramesh Kolhu Wale" <orders@rameshkolhuwale.com>',
        adminEmail: emailDoc?.adminEmail || process.env.ADMIN_EMAIL || 'rameshkolhuwale@gmail.com',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, googleSheetWebhookUrl, emailConfig } = body;
    const settingsCol = await getSettingsCollection();

    if (action === 'save_google_sheet') {
      await settingsCol.updateOne(
        { key: 'google_sheet_config' },
        {
          $set: {
            key: 'google_sheet_config',
            webhookUrl: googleSheetWebhookUrl || '',
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
      return NextResponse.json({ success: true, message: 'Google Sheet webhook URL saved successfully' });
    }

    if (action === 'test_google_sheet') {
      const testPayload = {
        orderId: `TEST-${Date.now().toString().slice(-4)}`,
        date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        customerName: 'Test Customer (RKW Admin)',
        phone: '9999999999',
        email: 'test@rameshkolhuwale.com',
        address: 'Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110001',
        itemsSummary: 'Yellow Mustard Oil (1L) x1 @ ₹340',
        subtotal: 340,
        shippingFee: 0,
        total: 340,
        paymentMethod: 'TEST PING',
        status: 'Test Connection',
        notes: 'Google Sheet Connection Test from RKW Admin Panel',
      };

      const result = await syncOrderToGoogleSheet(testPayload);
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, message: 'Successfully sent test order row to Google Sheet!' });
    }

    if (action === 'save_email_config') {
      await settingsCol.updateOne(
        { key: 'email_config' },
        {
          $set: {
            key: 'email_config',
            ...emailConfig,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
      return NextResponse.json({ success: true, message: 'Email configurations saved successfully' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
