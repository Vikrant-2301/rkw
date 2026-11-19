import nodemailer from 'nodemailer';
import { getSettingsCollection } from './mongodb';

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: Array<{
    name: string;
    size: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  date: string;
}

export async function getEmailConfig() {
  let dbConfig: Record<string, string> | null = null;
  try {
    const settingsCol = await getSettingsCollection();
    const doc = await settingsCol.findOne({ key: 'email_config' });
    if (doc) {
      dbConfig = doc as Record<string, string>;
    }
  } catch (err) {
    console.error('Failed to get email config from DB:', err);
  }

  const host = dbConfig?.smtpHost || process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(dbConfig?.smtpPort || process.env.SMTP_PORT || '465', 10);
  const user = dbConfig?.smtpUser || process.env.SMTP_USER || 'lpure.farms@gmail.com';
  const pass = (dbConfig?.smtpPass || process.env.SMTP_PASS || 'snbnubmxykzmdqlz').replace(/\s+/g, '');
  const from = dbConfig?.smtpFrom || process.env.SMTP_FROM || '"Ramesh Kolhu Wale" <lpure.farms@gmail.com>';
  const adminEmail = dbConfig?.adminEmail || process.env.ADMIN_EMAIL || 'lpure.farms@gmail.com';

  return { host, port, user, pass, from, adminEmail };
}

export function createTransporter(config: { host: string; port: number; user: string; pass: string }) {
  if (!config.host || !config.user || !config.pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

export async function sendOrderEmails(order: OrderEmailData): Promise<{ customerSent: boolean; adminSent: boolean; error?: string }> {
  try {
    const config = await getEmailConfig();
    const transporter = createTransporter(config);

    if (!transporter) {
      console.log(`[Email Simulation] SMTP not fully configured. Order #${order.orderId} recorded.`);
      return { customerSent: false, adminSent: false, error: 'SMTP credentials not configured yet' };
    }

    const itemsRowsHtml = order.items
      .map(
        item => `
        <tr style="border-bottom: 1px solid #E8E0D0;">
          <td style="padding: 12px 8px; font-weight: 600; color: #1C1A16;">
            ${item.name}
            <div style="font-size: 12px; color: #8A7E6E; font-weight: 400;">Size: ${item.size}</div>
          </td>
          <td style="padding: 12px 8px; text-align: center; color: #5A5248;">x${item.quantity}</td>
          <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #0E2A47;">₹${item.total}</td>
        </tr>
      `
      )
      .join('');

    // 1. Customer Email
    let customerSent = false;
    if (order.email && order.email.includes('@')) {
      const customerHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF8F3; padding: 24px; border-radius: 16px; border: 1px solid #E8E0D0;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #D4A017;">
            <h1 style="color: #0E2A47; margin: 0; font-size: 26px; font-serif;">RAMESH KOLHU WALE</h1>
            <p style="color: #B8860B; margin: 4px 0 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Pure Cold-Pressed Oils &amp; Vedic Bilona Ghee · Est. 1981</p>
          </div>

          <div style="background-color: #0E2A47; color: #FFFFFF; padding: 20px; border-radius: 12px; margin-top: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px; color: #F5E6B0;">Your Order Has Been Accepted!</h2>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #EBF2F8; line-height: 1.5;">
              Our customer care will contact you shortly to confirm your delivery and address details.
            </p>
            <div style="display: inline-block; background-color: #B8860B; color: #FFFFFF; font-weight: bold; font-family: monospace; font-size: 18px; padding: 6px 16px; border-radius: 6px; margin-top: 14px;">
              ORDER ID: ${order.orderId}
            </div>
          </div>

          <div style="background-color: #FFFFFF; padding: 20px; border-radius: 12px; margin-top: 20px; border: 1px solid #E8E0D0;">
            <h3 style="margin-top: 0; color: #0E2A47; font-size: 16px; border-bottom: 1px solid #E8E0D0; padding-bottom: 8px;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="border-bottom: 1px solid #D0C8B8; color: #8A7E6E; font-size: 12px; text-align: left;">
                  <th style="padding: 8px;">Product</th>
                  <th style="padding: 8px; text-align: center;">Qty</th>
                  <th style="padding: 8px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRowsHtml}
              </tbody>
            </table>

            <div style="margin-top: 16px; border-top: 1px solid #E8E0D0; padding-top: 12px; font-size: 14px;">
              <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #5A5248;">
                <span>Subtotal:</span>
                <span>₹${order.subtotal}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 4px 0; color: #5A5248;">
                <span>Delivery:</span>
                <span>${order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0 0 0; border-top: 1px solid #E0D8CC; font-weight: bold; font-size: 17px; color: #0E2A47;">
                <span>Total Amount:</span>
                <span>₹${order.total}</span>
              </div>
            </div>
          </div>

          <div style="background-color: #FFFFFF; padding: 18px; border-radius: 12px; margin-top: 16px; border: 1px solid #E8E0D0; font-size: 13px; color: #4A4035;">
            <strong style="color: #0E2A47;">Delivery Address:</strong><br/>
            ${order.customerName}<br/>
            ${order.address}, ${order.city}, ${order.state} - ${order.pincode}<br/>
            Phone: <strong>${order.phone}</strong><br/>
            Payment Mode: <strong>${order.paymentMethod.toUpperCase()}</strong>
          </div>

          <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #8A7E6E;">
            <p>Questions? Reach out directly via WhatsApp at <strong>+91 92177 44380</strong></p>
            <p>Ramesh Kolhu Wale · 4 Live Units in Delhi NCR · 100% Pure &amp; Lab-Tested</p>
          </div>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: config.from,
          to: order.email,
          subject: `Order Accepted: Ramesh Kolhu Wale #${order.orderId}`,
          html: customerHtml,
        });
        customerSent = true;
      } catch (e) {
        console.error('Failed to send customer confirmation email:', e);
      }
    }

    // 2. Admin Notification Email
    let adminSent = false;
    if (config.adminEmail) {
      const adminHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFFDF9; padding: 24px; border-radius: 16px; border: 2px solid #0E2A47;">
          <div style="background-color: #0E2A47; color: #FFFFFF; padding: 16px; border-radius: 8px; text-align: center;">
            <h2 style="margin: 0; color: #F5E6B0; font-size: 20px;">🚨 NEW ORDER RECEIVED: #${order.orderId}</h2>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #EBF2F8;">Action Required: Call customer to confirm delivery.</p>
          </div>

          <div style="margin-top: 16px; padding: 16px; background-color: #EBF2F8; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #0E2A47; font-size: 15px;">Customer Contact Information</h3>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Name:</strong> ${order.customerName}</p>
            <p style="margin: 4px 0; font-size: 14px;">
              <strong>Phone:</strong> <a href="tel:${order.phone}" style="color: #0E2A47; font-weight: bold;">${order.phone}</a>
              · <a href="https://wa.me/91${order.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customerName)},%20calling%20from%20Ramesh%20Kolhu%20Wale%20regarding%20your%20order%20%23${order.orderId}" style="color: #25D366; font-weight: bold; text-decoration: underline;">WhatsApp</a>
            </p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> ${order.email || 'Not provided'}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Address:</strong> ${order.address}, ${order.city}, ${order.state} - ${order.pincode}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
          </div>

          <div style="margin-top: 16px; padding: 16px; background-color: #FFFFFF; border: 1px solid #E8E0D0; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #0E2A47; font-size: 15px;">Order Details (Total: ₹${order.total})</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="border-bottom: 1px solid #D0C8B8; color: #8A7E6E; text-align: left;">
                  <th style="padding: 6px;">Item</th>
                  <th style="padding: 6px; text-align: center;">Qty</th>
                  <th style="padding: 6px; text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      `;

      try {
        await transporter.sendMail({
          from: config.from,
          to: config.adminEmail,
          subject: `🚨 NEW ORDER #${order.orderId} - ₹${order.total} from ${order.customerName}`,
          html: adminHtml,
        });
        adminSent = true;
      } catch (e) {
        console.error('Failed to send admin notification email:', e);
      }
    }

    return { customerSent, adminSent };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error in sendOrderEmails:', message);
    return { customerSent: false, adminSent: false, error: message };
  }
}
