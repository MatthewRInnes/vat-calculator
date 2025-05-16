/**
 * Calculator header component
 * Displays the title and description for the VAT calculator
 */
import { Percent } from "lucide-react";

const CalculatorHeader = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="bg-blue-500 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
        <Percent className="h-8 w-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-center">VAT Calculator</h1>
      <p className="text-gray-500 text-center mt-2 text-sm">
        Calculate VAT quickly and easily for your business transactions
      </p>
    </div>
  );
};

export default CalculatorHeader;
