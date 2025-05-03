
import { CoffeeFlavor } from './CoffeeCustomizer';

interface FlavorOptionProps {
  flavor: CoffeeFlavor;
  selected: boolean;
  onClick: () => void;
}

export default function FlavorOption({
  flavor,
  selected,
  onClick
}: FlavorOptionProps) {
  // Define color and icon for each flavor
  const getFlavorStyle = () => {
    switch (flavor) {
      case 'vanilla':
        return {
          bg: selected ? 'bg-yellow-100' : 'bg-yellow-50',
          border: selected ? 'border-yellow-400' : 'border-gray-200',
          text: selected ? 'text-yellow-800' : 'text-gray-700',
          emoji: '🌱'
        };
      case 'caramel':
        return {
          bg: selected ? 'bg-amber-100' : 'bg-amber-50',
          border: selected ? 'border-amber-400' : 'border-gray-200',
          text: selected ? 'text-amber-800' : 'text-gray-700',
          emoji: '🍯'
        };
      case 'hazelnut':
        return {
          bg: selected ? 'bg-brown-100' : 'bg-stone-50',
          border: selected ? 'border-brown-400' : 'border-gray-200',
          text: selected ? 'text-brown-800' : 'text-gray-700',
          emoji: '🌰'
        };
      default:
        return {
          bg: selected ? 'bg-gray-100' : 'bg-gray-50',
          border: selected ? 'border-gray-400' : 'border-gray-200',
          text: selected ? 'text-gray-800' : 'text-gray-700',
          emoji: '❌'
        };
    }
  };

  const style = getFlavorStyle();

  return (
    <button
      onClick={onClick}
      className={`
        ${style.bg} ${style.border} ${style.text}
        flex items-center gap-2 p-3 rounded-lg border-2
        transition-all hover:shadow-sm
        ${selected ? 'shadow-md font-medium' : 'font-normal'}
      `}
    >
      <span className="text-lg">{style.emoji}</span>
      <span className="capitalize">{flavor === 'none' ? 'No Flavor' : flavor}</span>
    </button>
  );
}