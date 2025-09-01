import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, sessionId } = await req.json();

    if (!resumeText || !sessionId) {
      throw new Error("Resume text and session ID are required");
    }

    // Verify payment with Stripe
    const stripe = new Stripe(stripeSecretKey || "", { apiVersion: "2023-10-16" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      throw new Error("Payment not completed");
    }

    console.log(`Processing resume analysis for paid session: ${sessionId}`);

    // Analyze resume with OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert resume analyst and career coach. Analyze the provided resume and return a JSON response with the following structure:
            {
              "score": number (1-100),
              "strengths": [array of specific strengths found],
              "weaknesses": [array of specific areas for improvement],
              "keywordSuggestions": [array of industry keywords to add],
              "improvedVersion": "string with improved resume version",
              "industrySpecificTips": [array of industry-specific recommendations]
            }
            
            Focus on:
            - ATS optimization
            - Quantified achievements
            - Industry keywords
            - Professional formatting
            - Action verbs and impact statements
            - Skills alignment with job market trends`
          },
          {
            role: 'user',
            content: `Please analyze this resume:\n\n${resumeText}`
          }
        ],
        max_tokens: 3000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    let analysis;
    
    try {
      analysis = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      const content = data.choices[0].message.content;
      analysis = {
        score: 75,
        strengths: ["Professional experience documented", "Skills section present"],
        weaknesses: ["Needs more quantified achievements", "Could benefit from stronger action verbs"],
        keywordSuggestions: ["Industry-specific terms needed", "Technical skills optimization"],
        improvedVersion: content,
        industrySpecificTips: ["Focus on metrics and outcomes", "Optimize for ATS systems"]
      };
    }

    console.log(`Resume analysis completed for session: ${sessionId}`);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});