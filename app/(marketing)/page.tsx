import { Button } from "@/components/ui/button";
import Heading from "./_components/Heading";
import Heros from "./_components/Heros";
import Footer from "./_components/Footer";
const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center gap-y-8 md:justify-start flex-1 text-center">
        <Heading />
        <Heros />
      </div>
      <Footer/>
    </div>
  );
};
export default MarketingPage;
