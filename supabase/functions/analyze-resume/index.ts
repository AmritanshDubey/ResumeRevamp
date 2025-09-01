// supabase/functions/analyze-resume/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const resumeText = (body?.resumeText || "").trim();

    if (!resumeText) {
      return new Response(
        JSON.stringify({ error: "resumeText is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY is not configured in function secrets" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Instruct the model to produce a strict JSON response so we can parse it reliably
    const systemPrompt = `You are an expert resume writer and career coach. When given a resume, return a JSON object with the following fields:
- score: integer (0-100)
- strengths: array of short strings
- weaknesses: array of short strings
- keywordSuggestions: array of strings
- industrySpecificTips: array of strings
- improvedVersion: string (the fully polished resume text).
Return ONLY valid JSON in the response body.`;

    const userPrompt = `Analyze and improve this resume. Provide the JSON described above.\n\nResume:\n\n${resumeText}`;

    // Call OpenAI Chat Completions endpoint
    const openaiResp = await fetch("https://api.open
