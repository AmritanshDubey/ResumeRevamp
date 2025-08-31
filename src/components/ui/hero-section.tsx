import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Users } from "lucide-react";
import { AuthButton } from "./auth-button";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-hero py-20 px-6 relative">
      {/* Auth Button in top right */}
      <div className="absolute top-6 right-6 z-10">
        <AuthButton />
      </div>
      
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-white">Trusted by 10,000+ professionals</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Transform Your Resume with 
          <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            AI-Powered Insights
          </span>
        </h1>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Get expert-level feedback and a professionally polished resume in seconds. 
          Land more interviews with our advanced AI critique system.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg shadow-medium">
            Start Free Analysis
          </Button>
          <Button variant="outline" size="lg" className="border-accent/60 text-accent hover:bg-accent/10 backdrop-blur-sm bg-white/5 px-8 py-3 text-lg">
            View Sample Report
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-white/90">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>Instant Analysis</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-white/90">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>Professional Format</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-white/90">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span>ATS Optimized</span>
          </div>
        </div>
      </div>
    </section>
  );
};