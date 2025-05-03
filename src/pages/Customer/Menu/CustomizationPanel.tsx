import React from "react";

export interface CoffeeState {
  base: "espresso" | "americano" | "latte";
  sugarPercentage: number;
  milkPercentage: number;
  flavor: "vanilla" | "caramel" | "hazelnut" | "none";
  size: "small" | "medium" | "large";
}

interface CustomizationPanelProps {
  coffee: CoffeeState;
  onBaseChange: (base: "espresso" | "americano" | "latte") => void;
  onSugarChange: (percentage: number) => void;
  onMilkChange: (percentage: number) => void;
  onFlavorChange: (flavor: "vanilla" | "caramel" | "hazelnut" | "none") => void;
  onSizeChange: (size: "small" | "medium" | "large") => void;
  onReset: () => void;
  onOrder: () => void;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  coffee,
  onBaseChange,
  onSugarChange,
  onMilkChange,
  onFlavorChange,
  onSizeChange,
  onReset,
  onOrder,
}) => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold">Customize Your Coffee</h2>

      <div className="space-y-4">
        {/* Base */}
        <div>
          <label className="block">Coffee Base</label>
          <select
            value={coffee.base}
            onChange={(e) =>
              onBaseChange(e.target.value as "espresso" | "americano" | "latte")
            }
            className="w-full p-2 border rounded"
          >
            <option value="espresso">Espresso</option>
            <option value="americano">Americano</option>
            <option value="latte">Latte</option>
          </select>
        </div>

        {/* Sugar */}
        <div>
          <label className="block">Sugar Percentage</label>
          <input
            type="number"
            min="0"
            max="100"
            value={coffee.sugarPercentage}
            onChange={(e) => onSugarChange(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Milk */}
        <div>
          <label className="block">Milk Percentage</label>
          <input
            type="number"
            min="0"
            max="100"
            value={coffee.milkPercentage}
            onChange={(e) => onMilkChange(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Flavor */}
        <div>
          <label className="block">Flavor</label>
          <select
            value={coffee.flavor}
            onChange={(e) =>
              onFlavorChange(
                e.target.value as "vanilla" | "caramel" | "hazelnut" | "none"
              )
            }
            className="w-full p-2 border rounded"
          >
            <option value="none">None</option>
            <option value="vanilla">Vanilla</option>
            <option value="caramel">Caramel</option>
            <option value="hazelnut">Hazelnut</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="block">Cup Size</label>
          <select
            value={coffee.size}
            onChange={(e) =>
              onSizeChange(e.target.value as "small" | "medium" | "large")
            }
            className="w-full p-2 border rounded"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
        <button
          onClick={onOrder}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Order Coffee
        </button>
      </div>
    </div>
  );
};

export default CustomizationPanel;
