/**
 * VAT Calculator component
 * Provides a form for calculating VAT with support for different rates and calculation methods
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calculator, RefreshCw } from "lucide-react";
import CalculatorHeader from "./CalculatorHeader";
import VatResults from "./VatResults";

// Available VAT rates for selection
const VAT_RATES = [
  { value: "20", label: "20%" },
  { value: "22", label: "22%" },
  { value: "23", label: "23%" },
  { value: "25", label: "25%" },
  { value: "5", label: "5% (Reduced)" },
  { value: "custom", label: "Custom" },
];

const VatCalculator = () => {
  // State management for calculator values
  const [amount, setAmount] = useState<string>("");
  const [customRate, setCustomRate] = useState<string>(""); 
  const [vatRate, setVatRate] = useState<string>("20");
  const [vatAmount, setVatAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [calculationType, setCalculationType] = useState<"exclusive" | "inclusive">("exclusive");
  const { toast } = useToast();

  // Handle VAT calculation
  const handleCalculate = () => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than zero.",
        variant: "destructive",
      });
      return;
    }
    
    const rate = vatRate === "custom" ? parseFloat(customRate) : parseFloat(vatRate);
    
    if (vatRate === "custom" && (isNaN(rate) || rate < 0 || rate > 100)) {
      toast({
        title: "Invalid VAT rate",
        description: "Please enter a valid VAT rate between 0 and 100.",
        variant: "destructive",
      });
      return;
    }

    let vat: number;
    let total: number;
    
    if (calculationType === "exclusive") {
      // VAT is added to the amount
      vat = numAmount * (rate / 100);
      total = numAmount + vat;
    } else {
      // VAT is included in the amount
      vat = numAmount - (numAmount / (1 + rate / 100));
      total = numAmount;
    }
    
    setVatAmount(vat);
    setTotalAmount(total);
    
    toast({
      title: "Calculation complete",
      description: `VAT calculated at ${rate}%`,
    });
  };

  // Reset calculator form
  const handleReset = () => {
    setAmount("");
    setCustomRate("");
    setVatRate("20");
    setVatAmount(null);
    setTotalAmount(null);
    toast({
      title: "Form reset",
      description: "All values have been cleared",
    });
  };

  const effectiveVatRate = vatRate === "custom" ? customRate : vatRate;

  return (
    <div className="w-full max-w-md px-4">
      <Card className="shadow-lg border-none">
        <CardContent className="p-6">
          <CalculatorHeader />
          
          <Tabs 
            defaultValue="exclusive" 
            className="mt-6"
            onValueChange={(value) => setCalculationType(value as "exclusive" | "inclusive")}
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="exclusive">VAT Exclusive</TabsTrigger>
              <TabsTrigger value="inclusive">VAT Inclusive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="exclusive" className="space-y-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                    <Input
                      id="amount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter amount"
                      className="pl-8"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vat-rate">VAT Rate</Label>
                  <Select value={vatRate} onValueChange={setVatRate}>
                    <SelectTrigger id="vat-rate">
                      <SelectValue placeholder="Select VAT rate" />
                    </SelectTrigger>
                    <SelectContent>
                      {VAT_RATES.map((rate) => (
                        <SelectItem key={rate.value} value={rate.value}>
                          {rate.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {vatRate === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-rate">Custom Rate (%)</Label>
                    <Input
                      id="custom-rate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="Enter custom VAT rate"
                      value={customRate}
                      onChange={(e) => setCustomRate(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="inclusive" className="space-y-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount-inc">Amount (Including VAT)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                    <Input
                      id="amount-inc"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter total amount"
                      className="pl-8"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vat-rate-inc">VAT Rate</Label>
                  <Select value={vatRate} onValueChange={setVatRate}>
                    <SelectTrigger id="vat-rate-inc">
                      <SelectValue placeholder="Select VAT rate" />
                    </SelectTrigger>
                    <SelectContent>
                      {VAT_RATES.map((rate) => (
                        <SelectItem key={rate.value} value={rate.value}>
                          {rate.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {vatRate === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-rate-inc">Custom Rate (%)</Label>
                    <Input
                      id="custom-rate-inc"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="Enter custom VAT rate"
                      value={customRate}
                      onChange={(e) => setCustomRate(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <VatResults 
            vatAmount={vatAmount} 
            totalAmount={totalAmount} 
            netAmount={calculationType === "exclusive" ? parseFloat(amount) || 0 : (totalAmount || 0) - (vatAmount || 0)}
            vatRate={effectiveVatRate}
            calculationType={calculationType}
          />
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Button 
              onClick={handleCalculate} 
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate VAT
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReset}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VatCalculator;
