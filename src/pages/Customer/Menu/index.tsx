// index.tsx
import CoffeeCustomizer from "./CoffeeCustomizer";
import { useIsMobile } from "@/hooks/use-mobile";

const Menu = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`min-h-screen bg-gradient-to-b from-coffee-cream to-white ${
      isMobile ? 'p-0' : 'py-8 px-2 sm:py-12 sm:px-4'
    }`}>
      {!isMobile && (
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-6 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-coffee-dark mb-2">Brew Your Bliss Blend</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Customize your perfect coffee by adjusting ingredients and flavors. 
              Watch as your cup changes to match your unique creation!
            </p>
          </header>

          <CoffeeCustomizer />
          
          <footer className="mt-8 sm:mt-16 text-center text-gray-500 text-xs sm:text-sm">
            <p>Crafted with ☕ for coffee lovers everywhere</p>
          </footer>
        </div>
      )}
      
      {isMobile && (
        <CoffeeCustomizer />
      )}
    </div>
  );
};

export default Menu;
