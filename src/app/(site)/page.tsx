import Hero from "@/src/components/site/home/Hero";
import TrustStrip from "@/src/components/site/home/TrustStrip";
import CategoryCards from "@/src/components/site/home/CategoryCards";
import BrandPromise from "@/src/components/site/home/BrandPromise";
import InfoPanel from "@/src/components/site/home/InfoPanel";
import FlavorShowcase from "@/src/components/site/home/FlavorShowcase";
import QualityHighlights from "@/src/components/site/home/QualityHighlights";
import BrandTypography from "@/src/components/site/home/BrandTypography";
import ProductCatalog from "@/src/components/site/home/ProductCatalog";
import BrandStory from "@/src/components/site/home/BrandStory";
import IngredientCards from "@/src/components/site/home/IngredientCards";
import FaqSection from "@/src/components/site/home/FaqSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryCards />
      <BrandPromise />
      <InfoPanel />
      <FlavorShowcase />
      <QualityHighlights />
      <BrandTypography />
      <ProductCatalog />
      <BrandStory />
      <IngredientCards />
      <FaqSection />
    </>
  );
}
