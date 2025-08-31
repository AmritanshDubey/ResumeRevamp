import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Sparkles, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis({
        score: 82,
        strengths: [
          "Strong technical skills section with relevant technologies",
          "Quantified achievements with specific metrics",
          "Clear professional summary highlighting key experience",
          "Well-structured work experience with action verbs"
        ],
        weaknesses: [
          "Missing keywords for ATS optimization",
          "Could benefit from more industry-specific terminology",
          "Some bullets could be more impactful with stronger verbs",
          "Consider adding relevant certifications or training"
        ],
        improvedVersion: `JOHN SMITH
Senior Software Engineer | Full-Stack Developer

PROFESSIONAL SUMMARY
Results-driven Senior Software Engineer with 5+ years of experience building scalable web applications. Proven track record of leading cross-functional teams and delivering high-impact solutions that increased user engagement by 40% and reduced system downtime by 60%.

CORE COMPETENCIES
• Frontend: React, TypeScript, Next.js, Vue.js, HTML5, CSS3
• Backend: Node.js, Python, Java, REST APIs, GraphQL
• Database: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes, CI/CD
• Leadership: Team management, agile methodologies, code reviews

PROFESSIONAL EXPERIENCE

Senior Software Engineer | TechCorp Inc. | 2021 - Present
• Architected and developed microservices-based platform serving 100K+ daily active users
• Led team of 6 developers, improving code quality scores by 35% through implementation of best practices
• Optimized database queries resulting in 50% faster page load times
• Spearheaded migration to cloud infrastructure, reducing operational costs by 30%

Software Engineer | StartupXYZ | 2019 - 2021
• Built responsive web applications using React and Node.js, supporting 50K+ registered users
• Implemented automated testing suite, increasing code coverage from 40% to 90%
• Collaborated with product team to define technical requirements for new features
• Mentored 3 junior developers, contributing to 25% faster onboarding process

EDUCATION
Bachelor of Science in Computer Science | University of Technology | 2019
Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems

CERTIFICATIONS
• AWS Certified Solutions Architect (2022)
• Certified Scrum Master (2021)`
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <section className="py-16 px-6 bg-muted/30">
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