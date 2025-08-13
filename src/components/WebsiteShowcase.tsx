import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";

// Import website mockups
import ecommerceImg from "@/assets/website-ecommerce.jpg";
import portfolioImg from "@/assets/website-portfolio.jpg";
import restaurantImg from "@/assets/website-restaurant.jpg";
import businessImg from "@/assets/website-business.jpg";
import blogImg from "@/assets/website-blog.jpg";
import fitnessImg from "@/assets/website-fitness.jpg";

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
  },
  {
    id: "5",
    name: "TechBlog Daily",
    type: "Blog",
    image: blogImg,
    url: "https://techblog-daily.com"
  },
  {
    id: "6",
    name: "FitZone Gym",
    type: "Fitness",
    image: fitnessImg,
    url: "https://fitzone-gym.com"
  }
];

// Split websites into 3 columns
const column1 = [websites[0], websites[3], websites[0], websites[3]]; // E-commerce, Business (forward)
const column2 = [websites[1], websites[4], websites[1], websites[4]]; // Portfolio, Blog (backward)
const column3 = [websites[2], websites[5], websites[2], websites[5]]; // Restaurant, Fitness (forward)

export const WebsiteShowcase = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationOffset, setAnimationOffset] = useState(0);
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
    let offset = 0;
    const speed = 0.5; // Pixels per frame

    const drawColumn = (
      images: Website[], 
      startX: number, 
      columnWidth: number, 
      direction: number,
      columnOffset: number,
      canvasHeight: number
    ) => {
      const itemHeight = 200;
      const gap = 20;
      const totalItemHeight = itemHeight + gap;
      
      // Calculate how many images we need to show to fill the screen
      const visibleItems = Math.ceil(canvasHeight / totalItemHeight) + 2;
      
      for (let i = 0; i < visibleItems; i++) {
        const imageIndex = i % images.length;
        const website = images[imageIndex];
        const img = imagesRef.current.find(image => image.src.includes(website.image.split('/').pop() || ''));
        
        if (img) {
          const y = (i * totalItemHeight + (offset * direction) + columnOffset) % (canvasHeight + totalItemHeight);
          
          // Only draw if the image is visible
          if (y > -itemHeight && y < canvasHeight) {
            // Calculate image dimensions
            const aspectRatio = img.width / img.height;
            const imageWidth = Math.min(columnWidth - 20, itemHeight * aspectRatio);
            const imageHeight = imageWidth / aspectRatio;
            
            const x = startX + (columnWidth - imageWidth) / 2;
            
            // Add shadow
            ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 8;
            
            // Draw rounded rectangle background
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.roundRect(x - 5, y - 5, imageWidth + 10, imageHeight + 10, 8);
            ctx.fill();
            
            // Draw image
            ctx.shadowColor = "transparent";
            ctx.drawImage(img, x, y, imageWidth, imageHeight);
            
            // Add website info overlay
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.beginPath();
            ctx.roundRect(x, y + imageHeight - 60, imageWidth, 60, [0, 0, 8, 8]);
            ctx.fill();
            
            // Website name
            ctx.fillStyle = "#ffffff";
            ctx.font = "600 14px Inter, sans-serif";
            ctx.fillText(website.name, x + 10, y + imageHeight - 35);
            
            // Website type
            ctx.fillStyle = "#a855f7";
            ctx.font = "500 12px Inter, sans-serif";
            ctx.fillText(website.type, x + 10, y + imageHeight - 15);
          }
        }
      }
    };

    const animate = () => {
      const canvasWidth = canvas.offsetWidth;
      const canvasHeight = canvas.offsetHeight;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Update offset
      offset += speed;
      setAnimationOffset(offset);
      
      const columnWidth = canvasWidth / 3;
      
      // Draw three columns with different directions and offsets
      drawColumn(column1, 0, columnWidth, 1, 0, canvasHeight);           // Forward
      drawColumn(column2, columnWidth, columnWidth, -1, 100, canvasHeight);  // Backward, offset
      drawColumn(column3, columnWidth * 2, columnWidth, 1, 200, canvasHeight); // Forward, offset
      
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isLoaded]);

  return (
    <div className="relative w-full h-full">
      {/* Canvas container with 45-degree rotation */}
      <div className="w-full h-full transform rotate-45 origin-center scale-75">
        <canvas 
          ref={canvasRef}
          className="w-full h-full rounded-2xl shadow-glow"
          style={{ 
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            width: "100%",
            height: "100%" 
          }}
        />
      </div>
      
      {/* Overlay info - positioned outside the rotated canvas */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-hero-primary" />
                <span className="text-sm font-medium text-hero-primary">Live Showcase</span>
              </div>
              <h4 className="font-semibold text-foreground">6 Different Website Types</h4>
              <p className="text-sm text-muted-foreground">All generated in 3 clicks • Live in 30 seconds</p>
            </div>
            <Button variant="hero-outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Explore All
            </Button>
          </div>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="absolute top-6 right-6 z-10">
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-soft">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
            <span className="text-sm font-medium text-foreground">AI Building</span>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-subtle rounded-2xl z-20">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-hero-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading showcases...</p>
          </div>
        </div>
      )}
    </div>
  );
};