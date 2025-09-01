import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText } = await req.json();

    const fakeAnalysis = {
      score: 85,
      strengths: ["Clear formatting", "Relevant work experience"],
      weaknesses: ["No quantified achievements", "Lacks ATS keywords"],
      keywordSuggestions: ["Teamwork", "Leadership", "Project management"],
      improvedVersion:
        resumeText +
        "\n\n(Improved with stronger action verbs and measurable achievements.)",
      industrySpecificTips: [
        "Add more measurable results",
        "Tailor your resume to the job description",
      ],
    };

    return new Response(JSON.stringify(fakeAnalysis), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
