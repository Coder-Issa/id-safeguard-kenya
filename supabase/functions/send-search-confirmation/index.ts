
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface SearchConfirmationRequest {
  id_number: string;
  full_name: string;
  phone: string;
  amount: number;
  place_found?: string;
  notifiedEmail: string;
  timestamp: string;
  searcher_email?: string | null;
  searcher_phone?: string | null;
  searcher_name?: string | null;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: SearchConfirmationRequest = await req.json();

    const subject = `ID Search Payment Confirmed: ${body.id_number}`;
    const html = `
      <h2>ID Search Payment Confirmation</h2>
      <p>A user has searched for their ID and confirms Ksh ${body.amount} has been paid via M-Pesa:</p>
      <ul>
        <li><strong>ID Number:</strong> ${body.id_number}</li>
        <li><strong>Full Name:</strong> ${body.full_name}</li>
        <li><strong>Found At:</strong> ${body.place_found || "N/A"}</li>
        <li><strong>Payment Phone:</strong> ${body.phone}</li>
        <li><strong>Amount Paid:</strong> Ksh ${body.amount}</li>
        <li><strong>Confirmation Time:</strong> ${new Date(body.timestamp).toLocaleString()}</li>
      </ul>
      ${
        (body.searcher_email || body.searcher_phone || body.searcher_name)
          ? `<h3>Searcher/Requester Info</h3>
            <ul>
            ${body.searcher_name ? `<li><strong>Name:</strong> ${body.searcher_name}</li>` : ""}
            ${body.searcher_email ? `<li><strong>Email:</strong> ${body.searcher_email}</li>` : ""}
            ${body.searcher_phone ? `<li><strong>Phone:</strong> ${body.searcher_phone}</li>` : ""}
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
