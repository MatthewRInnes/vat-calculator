/**
 * Main index page component
 * Renders the VAT calculator in a centred layout
 */
import VatCalculator from "@/components/VatCalculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <VatCalculator />
    </div>
  );
};

export default Index;
