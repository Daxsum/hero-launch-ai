import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";

// Import website mockups
import ecommerceImg from "@/assets/website-ecommerce.jpg";
import portfolioImg from "@/assets/website-portfolio.jpg";
import restaurantImg from "@/assets/website-restaurant.jpg";
import businessImg from "@/assets/website-business.jpg";

interface Website {
  id: string;
  name: string;
  type: string;
  image: string;
  url: string;
}

const websites: Website[] = [
  {
    id: "1",
    name: "StyleHub Store",
    type: "E-commerce",
    image: ecommerceImg,
    url: "https://stylehub-demo.com"
  },
  {
    id: "2", 
    name: "John Doe Portfolio",
    type: "Portfolio",
    image: portfolioImg,
    url: "https://johndoe-portfolio.com"
  },
  {
    id: "3",
    name: "Bella Vista Restaurant", 
    type: "Restaurant",
    image: restaurantImg,
    url: "https://bellavista-restaurant.com"
  },
  {
    id: "4",
    name: "ProConsult Business",
    type: "Business",
    image: businessImg,
    url: "https://proconsult-business.com"
  }
];

export const WebsiteShowcase = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = websites.map((website) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = website.image;
        });
      });

      try {
        const loadedImages = await Promise.all(imagePromises);
        imagesRef.current = loadedImages;
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load images:", error);
      }
    };

    loadImages();
  }, []);

  // Canvas animation
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrame: number;
    let slideAnimation = 0;
    const slideSpeed = 0.02;

    const animate = () => {
      const canvasWidth = canvas.offsetWidth;
      const canvasHeight = canvas.offsetHeight;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Calculate positions
      const currentImg = imagesRef.current[currentIndex];
      const nextIndex = (currentIndex + 1) % websites.length;
      const nextImg = imagesRef.current[nextIndex];
      
      if (currentImg && nextImg) {
        // Calculate image dimensions to fit canvas while maintaining aspect ratio
        const padding = 20;
        const maxWidth = canvasWidth - padding * 2;
        const maxHeight = canvasHeight - padding * 2;
        
        const currentRatio = currentImg.width / currentImg.height;
        const nextRatio = nextImg.width / nextImg.height;
        
        // Current image
        let currentWidth = maxWidth;
        let currentHeight = currentWidth / currentRatio;
        if (currentHeight > maxHeight) {
          currentHeight = maxHeight;
          currentWidth = currentHeight * currentRatio;
        }
        
        // Next image
        let nextWidth = maxWidth;
        let nextHeight = nextWidth / nextRatio;
        if (nextHeight > maxHeight) {
          nextHeight = maxHeight;
          nextWidth = nextHeight * nextRatio;
        }
        
        // Animation offset
        const offset = slideAnimation * canvasWidth;
        
        // Draw current image (sliding out to left)
        const currentX = (canvasWidth - currentWidth) / 2 - offset;
        const currentY = (canvasHeight - currentHeight) / 2;
        
        if (currentX + currentWidth > 0) {
          // Add subtle shadow
          ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 10;
          
          ctx.drawImage(currentImg, currentX, currentY, currentWidth, currentHeight);
          
          // Reset shadow
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }
        
        // Draw next image (sliding in from right)
        const nextX = (canvasWidth - nextWidth) / 2 + canvasWidth - offset;
        const nextY = (canvasHeight - nextHeight) / 2;
        
        if (nextX < canvasWidth) {
          // Add subtle shadow
          ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 10;
          
          ctx.drawImage(nextImg, nextX, nextY, nextWidth, nextHeight);
          
          // Reset shadow
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }
      }
      
      // Update animation
      slideAnimation += slideSpeed;
      
      // Check if slide is complete
      if (slideAnimation >= 1) {
        slideAnimation = 0;
        setCurrentIndex(nextIndex);
      }
      
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isLoaded, currentIndex]);

  // Auto-slide timer
  useEffect(() => {
    const interval = setInterval(() => {
      // The animation will handle the transition
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentWebsite = websites[currentIndex];

  return (
    <div className="relative w-full h-full">
      {/* Canvas for sliding websites */}
      <canvas 
        ref={canvasRef}
        className="w-full h-full rounded-2xl shadow-glow"
        style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" }}
      />
      
      {/* Overlay with website info */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-hero-primary" />
                <span className="text-sm font-medium text-hero-primary">{currentWebsite?.type}</span>
              </div>
              <h4 className="font-semibold text-foreground">{currentWebsite?.name}</h4>
              <p className="text-sm text-muted-foreground">Generated in 3 clicks • Live in 30 seconds</p>
            </div>
            <Button variant="hero-outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dots indicator */}
      <div className="absolute top-6 right-6">
        <div className="flex gap-2">
          {websites.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-hero-primary w-6" 
                  : "bg-hero-primary/30"
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-subtle rounded-2xl">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-hero-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading showcases...</p>
          </div>
        </div>
      )}
    </div>
  );
};