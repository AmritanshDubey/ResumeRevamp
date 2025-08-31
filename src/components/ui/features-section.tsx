import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, FileCheck, Download, Zap, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Our advanced AI analyzes your resume against industry standards and best practices.",
    badge: "Smart"
  },
  {
    icon: FileCheck,
    title: "ATS Optimization",
    description: "Ensure your resume passes Applicant Tracking Systems with optimized keywords and formatting.",
    badge: "Essential"
  },
  {
    icon: Download,
    title: "Professional Formatting",
    description: "Get a beautifully formatted, professional resume ready for download.",
    badge: "Premium"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Receive comprehensive feedback and improvements in under 30 seconds.",
    badge: "Fast"
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    description: "Your resume data is processed securely and never stored permanently.",
    badge: "Secure"
  },
  {
    icon: Users,
    title: "Expert Insights",
    description: "Benefit from insights derived from thousands of successful resumes.",
    badge: "Proven"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Resume Analyzer?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered tool combines cutting-edge technology with industry expertise 
            to give you the competitive edge you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};