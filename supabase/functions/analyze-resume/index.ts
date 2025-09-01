import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

// --- Env ---
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
// Turn this on in dev: Settings → Functions → Add secret FREE_MODE=true
const FREE_MODE =
  (Deno.env.get("FREE_MODE") || "").toLowerCase() === "true" ||
  (Deno.env.get("NODE_ENV") || "").toLowerCase() === "development";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, sessionId } = await req.json();

    if (!resumeText || typeof resumeText !== "string") {
      return new Response(
        JSON.stringify({ error: "resumeText is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // --- Payment bypass logic ---
    const skipStripe =
      FREE_MODE ||
      !STRIPE_SECRET_KEY || // if Stripe key missing, treat as free mode
      sessionId === "free-demo-session"; // from the frontend we just set this

    if (skipStripe) {
      console.log("analyze-resume: skipping Stripe verification (FREE_MODE).");
    } else {
      if (!sessionId) {
        return new Response(
          JSON.stringify({ error: "sessionId is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
      const session = await stripe.checkout.sessions.r
