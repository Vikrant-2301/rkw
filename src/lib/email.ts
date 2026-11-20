import nodemailer from 'nodemailer';

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
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || 'lpure.farms@gmail.com';
  const pass = (process.env.SMTP_PASS || 'snbnubmxykzmdqlz').replace(/\s+/g, '');
  const from = process.env.SMTP_FROM || `"Ramesh Kolhu Wale" <${user}>`;
  const adminEmail = process.env.ADMIN_EMAIL || user;

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

export async function sendTestEmail(recipient?: string, customConfig?: { host?: string; port?: number; user?: string; pass?: string; from?: string }) {
  const activeConfig = await getEmailConfig();
  const config = {
    host: customConfig?.host || activeConfig.host,
    port: customConfig?.port || activeConfig.port,
    user: customConfig?.user || activeConfig.user,
    pass: (customConfig?.pass || activeConfig.pass).replace(/\s+/g, ''),
    from: customConfig?.from || activeConfig.from,
  };

  const transporter = createTransporter(config);
  if (!transporter) {
    return { success: false, error: 'SMTP configuration is incomplete (host, user, or pass missing).' };
  }

  const to = recipient || activeConfig.adminEmail || config.user;

  try {
    const info = await transporter.sendMail({
      from: config.from,
      to,
      subject: '✅ RKW Store Email Setup Verified & Active',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; background: #FAF8F3; border: 1px solid #E8E0D0; border-radius: 12px;">
          <h2 style="color: #0E2A47; margin-top: 0;">Ramesh Kolhu Wale</h2>
          <p style="color: #2e7d32; font-weight: bold; font-size: 16px;">✓ Email Integration Test Succeeded!</p>
          <p style="color: #5A5248; font-size: 14px;">Your store email (<strong>${config.user}</strong>) is successfully configured to send order confirmations, invoices, and receive new order alerts.</p>
          <hr style="border: 0; border-top: 1px solid #E8E0D0; margin: 16px 0;" />
          <p style="font-size: 12px; color: #8A7E6E;">Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
      `,
    });
    return { success: true, messageId: info.messageId, recipient: to };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, error: msg };
  }
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

          <div style="background-color: #FFFFFF; padding: 18px; border-radius: 12px; margin-top: 16px; border: 1px solid #E8E0D0; font-size: 12px; color: #5A5248; line-height: 1.6;">
            <div style="margin-bottom: 12px;">
              <strong style="color: #0E2A47; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">Shipping Policy:</strong>
              <ul style="margin: 6px 0 0 0; padding-left: 18px;">
                <li>Delivery time varies according to the location</li>
                <li>Free delivery only upto 15 km from our stores; additional charges may apply for other locations</li>
                <li>Additional cost of ₹100 will be applied for orders below ₹799</li>
              </ul>
            </div>
            <div>
              <strong style="color: #0E2A47; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">Return and Refund Policy:</strong>
              <p style="margin: 4px 0 0 0;">
                Kindly note that all purchases are final and we are unable to offer returns or exchanges.
              </p>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #8A7E6E;">
            <p style="margin: 0;">Questions? Reach out directly via WhatsApp at <strong>+91 92177 44380</strong></p>
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
