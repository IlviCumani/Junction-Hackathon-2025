
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-cafe-lightCream py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-cafe-brown mb-4">
              Experience Coffee <span className="text-cafe-accent">Reimagined</span>
            </h1>
            <p className="text-lg md:text-xl text-cafe-lightBrown mb-6">
              Order ahead, earn rewards, and enjoy a personalized café experience with Café Joy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-cafe-brown hover:bg-cafe-lightBrown text-white">
                <Link to="/menu">View Menu</Link>
              </Button>
              <Button variant="outline" className="border-cafe-brown text-cafe-brown hover:bg-cafe-cream/50">
                <Link to="/loyalty">Join Loyalty Program</Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-8 md:mt-0 md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <div className="bg-cafe-brown/20 backdrop-blur-sm absolute inset-0 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Coffee Shop" 
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4 z-20 bg-white/90 p-3 rounded-lg shadow">
                <p className="font-bold text-cafe-brown">Order ahead and skip the line!</p>
                <p className="text-sm text-cafe-lightBrown">Ready in 10-15 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
