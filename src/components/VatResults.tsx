/**
	* VAT Results component
	* Displays the calculated VAT amounts and totals in a formatted card
	*/
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface VatResultsProps {
  vatAmount: number | null;
  totalAmount: number | null;
  netAmount: number;
  vatRate: string;
  calculationType: "exclusive" | "inclusive";
}

const VatResults = ({ vatAmount, totalAmount, netAmount, vatRate, calculationType }: VatResultsProps) => {
  // Format currency values using British English locale
  const formatCurrency = (value: number | null) => {
    if (value === null) return "£0.00";
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(value);
  };

  return (
    <Card className="mt-8 p-4 bg-gray-50 border border-gray-200">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Net Amount:</span>
          <span className="font-medium">{formatCurrency(netAmount)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">VAT ({vatRate}%):</span>
          <span className="font-medium text-blue-600">{formatCurrency(vatAmount)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Grand Total:</span>
          <span className="text-lg font-bold">{formatCurrency(totalAmount)}</span>
        </div>
        
        {calculationType === "inclusive" && vatAmount !== null && (
          <p className="text-xs text-gray-500 mt-2 italic">
            *The amount you entered already includes VAT
          </p>
        )}
      </div>
    </Card>
  );
};

export default VatResults;
