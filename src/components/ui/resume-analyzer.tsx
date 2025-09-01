import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Sparkles, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "Please enter your resume",
        description: "Paste your resume text to get started with the analysis.",
        variant: "destructive",
      });
      return;
    }

    // Check if user has paid
    const sessionId = localStorage.getItem('payment_session_id');
    if (!sessionId) {
      toast({
        title: "Payment Required",
        description: "Please complete payment to access AI-powered resume analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-resume', {
        body: { 
          resumeText: resumeText.trim(),
          sessionId: sessionId
        }
      });

      if (error) {
        throw error;
      }

      setAnalysis(data);
      
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed by AI. Check the results below.",
      });
      
      // Clear the session ID after successful analysis
      localStorage.removeItem('payment_session_id');
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsAnalyzing(false);
  };

  return (
    <section className="py-16 px-6 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Resume Analysis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Paste your resume below and get instant, expert-level feedback to improve your chances of landing interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Your Resume</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[400px] resize-none"
              />
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {analysis ? (
              <>
                {/* Score Card */}
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle className="text-center">Resume Score</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-6xl font-bold text-primary mb-2">
                      {analysis.score}
                    </div>
                    <Badge variant="secondary" className="text-lg px-4 py-1">
                      Good Resume
                    </Badge>
                  </CardContent>
                </Card>

                {/* Analysis Details */}
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Strengths */}
                    <div>
                      <h4 className="font-semibold text-accent mb-3 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength: string, index: number) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Weaknesses */}
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-3 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {analysis.weaknesses.map((weakness: string, index: number) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Keywords */}
                    {analysis.keywordSuggestions && (
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-3">
                          Recommended Keywords
                        </h4>
                        <ul className="space-y-2">
                          {analysis.keywordSuggestions.map((keyword: string, index: number) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {keyword}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {analysis.industrySpecificTips && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-semibold text-purple-600 mb-3">
                            Industry Tips
                          </h4>
                          <ul className="space-y-2">
                            {analysis.industrySpecificTips.map((tip: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                • {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Improved Version */}
                <Card className="shadow-medium">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Improved Resume</CardTitle>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm">
                        {analysis.improvedVersion}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-medium">
                <CardContent className="flex items-center justify-center h-64 text-center">
                  <div>
                    <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Your analysis will appear here after you submit your resume.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};