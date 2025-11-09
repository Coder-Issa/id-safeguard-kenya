import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Input validation schema
const searchConfirmationSchema = z.object({
  id_number: z.string().trim().min(1).max(20).regex(/^[0-9]+$/, "ID number must contain only digits"),
  full_name: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(10).max(15).regex(/^[0-9+\-() ]+$/, "Invalid phone number format"),
  amount: z.number().positive().max(100000),
  place_found: z.string().trim().max(500).optional(),
  notifiedEmail: z.string().email().max(255),
  timestamp: z.string().datetime(),
  searcher_email: z.string().email().max(255).nullable().optional(),
  searcher_phone: z.string().trim().max(15).nullable().optional(),
  searcher_name: z.string().trim().max(200).nullable().optional(),
});

type SearchConfirmationRequest = z.infer<typeof searchConfirmationSchema>;

// HTML escape helper function
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    
    // Validate and sanitize input
    const validation = searchConfirmationSchema.safeParse(rawBody);
    
    if (!validation.success) {
      console.error("Validation error:", validation.error);
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: validation.error.format() }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    const body = validation.data;

    const subject = `ID Search Payment Confirmed: ${escapeHtml(body.id_number)}`;
    const html = `
      <h2>ID Search Payment Confirmation</h2>
      <p>A user has searched for their ID and confirms Ksh ${body.amount} has been paid via M-Pesa:</p>
      <ul>
        <li><strong>ID Number:</strong> ${escapeHtml(body.id_number)}</li>
        <li><strong>Full Name:</strong> ${escapeHtml(body.full_name)}</li>
        <li><strong>Found At:</strong> ${escapeHtml(body.place_found || "N/A")}</li>
        <li><strong>Payment Phone:</strong> ${escapeHtml(body.phone)}</li>
        <li><strong>Amount Paid:</strong> Ksh ${body.amount}</li>
        <li><strong>Confirmation Time:</strong> ${escapeHtml(new Date(body.timestamp).toLocaleString())}</li>
      </ul>
      ${
        (body.searcher_email || body.searcher_phone || body.searcher_name)
          ? `<h3>Searcher/Requester Info</h3>
            <ul>
            ${body.searcher_name ? `<li><strong>Name:</strong> ${escapeHtml(body.searcher_name)}</li>` : ""}
            ${body.searcher_email ? `<li><strong>Email:</strong> ${escapeHtml(body.searcher_email)}</li>` : ""}
            ${body.searcher_phone ? `<li><strong>Phone:</strong> ${escapeHtml(body.searcher_phone)}</li>` : ""}
            </ul>
          `
          : ""
      }
      <hr>
      <p>Please verify the payment in your M-PESA account and reach out to the ID owner for further recovery steps.</p>
    `;

    // Send email
    const { data, error } = await resend.emails.send({
      from: "ID Safeguard <onboarding@resend.dev>",
      to: [body.notifiedEmail],
      subject,
      html,
    });

    if (error) {
      console.error("Email sending error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    console.error("Edge Function Error:", err.message);
    return new Response(
      JSON.stringify({ error: err.message || "Unknown error." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
