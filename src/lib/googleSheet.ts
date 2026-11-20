export interface OrderSheetPayload {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  itemsSummary: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  status: string;
  notes?: string;
}

export const GOOGLE_APPS_SCRIPT_TEMPLATE = `
/**
 * Ramesh Kolhu Wale - Order Sync Script
 * 1. Open your Google Sheet
 * 2. Click Extensions -> Apps Script
 * 3. Replace all code with this snippet
 * 4. Click Deploy -> New deployment
 * 5. Select type: "Web app"
 * 6. Set Description: "RKW Order Webhook"
 * 7. Set Execute as: "Me"
 * 8. Set Who has access: "Anyone"
 * 9. Click Deploy, authorize access, and copy the Web App URL into the RKW Admin Panel!
 */

function setupSheetHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Order ID",
      "Date & Time",
      "Customer Name",
      "Phone",
      "Email",
      "Delivery Address",
      "City",
      "State",
      "Pincode",
      "Ordered Items",
      "Subtotal (₹)",
      "Shipping Fee (₹)",
      "Total Amount (₹)",
      "Payment Method",
      "Status",
      "Notes"
    ]);
    sheet.getRange(1, 1, 1, 16).setFontWeight("bold").setBackground("#0E2A47").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    setupSheetHeaders();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.orderId || "",
      data.date || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.customerName || "",
      "'" + (data.phone || ""),
      data.email || "",
      data.address || "",
      data.city || "",
      data.state || "",
      "'" + (data.pincode || ""),
      data.itemsSummary || "",
      data.subtotal || 0,
      data.shippingFee || 0,
      data.total || 0,
      data.paymentMethod || "",
      data.status || "Pending Confirmation",
      data.notes || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", orderId: data.orderId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`.trim();

export async function getGoogleSheetWebhookUrl(): Promise<string | null> {
  return process.env.GOOGLE_SHEET_WEBHOOK_URL || null;
}

export async function syncOrderToGoogleSheet(
  order: OrderSheetPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const webhookUrl = await getGoogleSheetWebhookUrl();
    if (!webhookUrl) {
      return {
        success: false,
        error: 'Google Sheet webhook URL is not configured yet.',
      };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const text = await response.text();
      return { success: false, error: `Google Sheets API returned status ${response.status}: ${text}` };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error syncing order to Google Sheet:', message);
    return { success: false, error: message };
  }
}
