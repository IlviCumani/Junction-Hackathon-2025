import { useState } from 'react';
import CoffeeCup from './CoffeeCup';
import CustomizationPanel from './CustomizationPanel';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from '@/components/ui/toast'; // Import your custom toast components

export type CoffeeBase = 'espresso' | 'americano' | 'latte';
export type CoffeeFlavor = 'vanilla' | 'caramel' | 'hazelnut' | 'none';
export type CupSize = 'small' | 'medium' | 'large';

export interface CoffeeState {
  base: CoffeeBase;
  sugarPercentage: number;
  milkPercentage: number;
  flavor: CoffeeFlavor;
  size: CupSize;
}

const defaultCoffee: CoffeeState = {
  base: 'espresso',
  sugarPercentage: 0,
  milkPercentage: 0,
  flavor: 'none',
  size: 'medium'
};

export default function CoffeeCustomizer() {
  const [coffee, setCoffee] = useState<CoffeeState>(defaultCoffee);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const updateCoffeeBase = (base: CoffeeBase) => {
    setCoffee(prev => ({ ...prev, base }));
  };

  const updateSugarPercentage = (percentage: number) => {
    setCoffee(prev => ({ ...prev, sugarPercentage: percentage }));
  };

  const updateMilkPercentage = (percentage: number) => {
    setCoffee(prev => ({ ...prev, milkPercentage: percentage }));
  };

  const updateFlavor = (flavor: CoffeeFlavor) => {
    setCoffee(prev => ({ ...prev, flavor }));
  };

  const updateSize = (size: CupSize) => {
    setCoffee(prev => ({ ...prev, size }));
  };

  const resetCoffee = () => {
    setCoffee(defaultCoffee);
    setToastMessage("Your coffee has been reset to default.");
    setShowToast(true);
  };

  const orderCoffee = () => {
    setToastMessage(`Your ${coffee.size} ${coffee.flavor !== 'none' ? coffee.flavor + ' ' : ''}${coffee.base} with ${coffee.sugarPercentage}% sugar and ${coffee.milkPercentage}% milk is being prepared.`);
    setShowToast(true);
  };

  return (
    <ToastProvider>
      {showToast && (
        <Toast>
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>{toastMessage}</ToastDescription>
          <ToastClose onClick={() => setShowToast(false)} />
        </Toast>
      )}
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto w-full">
        <div className="flex-1 flex justify-center items-center">
          <CoffeeCup coffeeState={coffee} />
        </div>
        <div className="flex-1">
          <CustomizationPanel
            coffee={coffee}
            onBaseChange={updateCoffeeBase}
            onSugarChange={updateSugarPercentage}
            onMilkChange={updateMilkPercentage}
            onFlavorChange={updateFlavor}
            onSizeChange={updateSize}
            onReset={resetCoffee}
            onOrder={orderCoffee}
          />
        </div>
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}
