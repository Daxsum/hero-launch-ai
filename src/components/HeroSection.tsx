import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Globe } from "lucide-react";
import { WebsiteShowcase } from "@/components/WebsiteShowcase";

export const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-hero-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-hero-secondary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-hero-primary/10 border border-hero-primary/20 rounded-full text-hero-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI-Powered Platform
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                Build & Publish
                <br />
                <span className="text-foreground">in Just</span>
                <br />
                <span className="text-hero-primary">3 Clicks</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Transform your ideas into live websites instantly with our revolutionary AI platform. No coding, no design skills needed - just pure creation power.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                <Zap className="w-5 h-5 mr-2" />
                Start Building Now
              </Button>
              <Button variant="hero-outline" size="lg" className="text-lg px-8 py-6">
                <Globe className="w-5 h-5 mr-2" />
                View Live Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-hero-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Sites Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-hero-primary">&lt; 30s</div>
                <div className="text-sm text-muted-foreground">Average Build Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-hero-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
          
          {/* Right content - Website Showcase Canvas */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative h-[500px] lg:h-[600px]">
              <WebsiteShowcase />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-soft animate-float">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
                <span className="text-sm font-medium text-foreground">Live in 3 clicks</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-soft animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-hero-primary" />
                <span className="text-sm font-medium text-foreground">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section - Process steps */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-soft">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Describe Your Vision</h3>
            <p className="text-muted-foreground">Tell our AI what kind of website you want to create</p>
          </div>
          
          <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-soft">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">AI Builds It</h3>
            <p className="text-muted-foreground">Watch as our AI creates your perfect website in seconds</p>
          </div>
          
          <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-soft">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Publish & Go Live</h3>
            <p className="text-muted-foreground">Your website is instantly live and ready for the world</p>
          </div>
        </div>
      </div>
    </section>
  );
};