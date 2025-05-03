
import { Coffee, Droplet } from 'lucide-react';
import { CoffeeState } from './CoffeeCustomizer';

interface CoffeeCupProps {
  coffeeState: CoffeeState;
  className?: string;
}

export default function CoffeeCup({ coffeeState, className = "" }: CoffeeCupProps) {
  // Calculate colors based on the coffee state
  const getCoffeeColor = () => {
    const { base, milkPercentage } = coffeeState;
    
    // Base coffee colors
    let baseColor = '';
    switch(base) {
      case 'espresso': 
        baseColor = '#3A2718';
        break;
      case 'americano':
        baseColor = '#5E4530';
        break;
      case 'latte':
        baseColor = '#8C6E4A';
        break;
      default:
        baseColor = '#3A2718';
    }
    
    // Blend with milk if present
    if (milkPercentage > 0) {
      // Simple color blending based on milk percentage
      return `linear-gradient(to bottom, 
                ${milkPercentage > 80 ? '#F5F5DC' : '#D2B48C'} ${milkPercentage / 5}%, 
                ${baseColor} ${100 - (milkPercentage / 2)}%)`;
    }
    
    return baseColor;
  };

  // Calculate fill height based on cup size
  const getFillHeight = () => {
    // Fill level will be based on base + milk + sugar
    const baseLevel = 50; // Base starts at 50%
    const milkSugarLevel = (coffeeState.milkPercentage + coffeeState.sugarPercentage) / 4;
    
    // Cap at 85% to leave space at top
    return Math.min(85, baseLevel + milkSugarLevel) + '%';
  };

  // Get flavor decoration
  const getFlavorDecoration = () => {
    if (coffeeState.flavor === 'none') return null;
    
    const flavorColors = {
      vanilla: '#FFF8E1',
      caramel: '#D4A76A',
      hazelnut: '#8B5A2B'
    };
    
    return (
      <div 
        className="absolute top-8 w-3/4 h-2 rounded-full"
        style={{ backgroundColor: flavorColors[coffeeState.flavor] }}
      />
    );
  };

  // Get cup size dimensions
  const getCupSizeDimensions = () => {
    switch(coffeeState.size) {
      case 'small':
        return { height: "h-64", width: "w-48" };
      case 'medium':
        return { height: "h-72", width: "w-56" };
      case 'large':
        return { height: "h-80", width: "w-64" };
      default:
        return { height: "h-72", width: "w-56" };
    }
  };

  // Generate bubbles for visual effect
  const generateBubbles = () => {
    // Only show bubbles for milk > 40% or sugar > 40%
    if (coffeeState.milkPercentage < 40 && coffeeState.sugarPercentage < 40) return null;
    
    const bubbleCount = Math.floor(
      (coffeeState.milkPercentage + coffeeState.sugarPercentage) / 20
    );
    
    return Array.from({ length: bubbleCount }).map((_, i) => (
      <div 
        key={i} 
        className="absolute rounded-full bg-white/30 animate-pulse"
        style={{ 
          width: `${3 + (i % 3)}px`,
          height: `${3 + (i % 3)}px`,
          bottom: `${10 + (i * 5) % 60}%`, 
          left: `${15 + (i * 10) % 70}%`, 
          animationDelay: `${i * 0.3}s` 
        }}
      />
    ));
  };

  const { height, width } = getCupSizeDimensions();
  const fillHeight = getFillHeight();

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Cup container */}
      <div className={`relative ${height} ${width}`}>
        {/* Starbucks cup design */}
        <div className="absolute bottom-0 w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Cup body */}
            <div className="absolute bottom-0 w-full h-full bg-white rounded-md" 
                style={{ 
                  clipPath: "polygon(5% 10%, 95% 10%, 100% 100%, 0% 100%)"
                }}>
              
              {/* Starbucks Logo */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full"></div>
                </div>
              </div>
              
              {/* Cup sleeve */}
              <div className="absolute w-full h-1/3 bg-coffee-light/30 bottom-1/4" 
                  style={{ 
                    clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)"
                  }}>
              </div>
              
              {/* Coffee liquid container with clipPath */}
              <div className="absolute bottom-0 w-full overflow-hidden"
                   style={{ 
                     height: '85%',
                     clipPath: "polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)"
                   }}>
                
                {/* Coffee liquid that fills dynamically */}
                <div 
                  className="absolute bottom-0 w-full transition-all duration-700 ease-in-out"
                  style={{ 
                    height: fillHeight,
                    background: getCoffeeColor(),
                  }}
                >
                  {/* Bubbles for visual effect */}
                  {generateBubbles()}
                  
                  {/* Flavor decoration */}
                  {getFlavorDecoration()}
                </div>
                
                {/* Foam layer for milk > 60% */}
                {coffeeState.milkPercentage > 60 && (
                  <div 
                    className="absolute w-full bg-coffee-foam transition-all duration-500"
                    style={{ 
                      height: '8%', 
                      bottom: `calc(${fillHeight} - 8%)`,
                    }}
                  />
                )}
              </div>
            </div>
            
            {/* Cup lid */}
            <div className="absolute top-0 w-full h-[10%] bg-slate-700 rounded-t-lg z-10 overflow-hidden">
              {/* Drinking hole */}
              <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-1/6 h-1/3 bg-slate-900 rounded-sm"></div>
              
              {/* Lid lines */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-[1px] bg-slate-600"></div>
              <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-[1px] bg-slate-600"></div>
            </div>
            
            {/* Straw */}
            <div className="absolute -top-4 right-1/4 w-2 h-16 bg-white transform -rotate-12 rounded-full z-20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-100/80 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Steam effect for hot coffee */}
        <div className="absolute -top-6 left-1/4 opacity-30">
          <div className="w-1 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute -top-8 left-2/4 opacity-30">
          <div className="w-1 h-8 bg-gray-300 rounded-full animate-pulse delay-75"></div>
        </div>
        <div className="absolute -top-4 left-3/4 opacity-30">
          <div className="w-1 h-5 bg-gray-300 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
      
      {/* Coffee info */}
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold">
          {coffeeState.size.charAt(0).toUpperCase() + coffeeState.size.slice(1)} {coffeeState.flavor !== 'none' ? `${coffeeState.flavor} ` : ''}
          {coffeeState.base.charAt(0).toUpperCase() + coffeeState.base.slice(1)}
        </h3>
        <div className="flex justify-center items-center gap-4 mt-2 text-gray-600">
          <span className="flex items-center gap-1">
            <Droplet size={16} />
            {coffeeState.milkPercentage}% milk
          </span>
          <span className="flex items-center gap-1">
            <Coffee size={16} />
            {coffeeState.sugarPercentage}% sugar
          </span>
        </div>
      </div>
    </div>
  );
}