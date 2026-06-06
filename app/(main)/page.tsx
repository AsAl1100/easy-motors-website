import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AdvantagesSection from "@/components/home/AdvantagesSection";
import PopularCars from "@/components/home/PopularCars";
import CreditSection from "@/components/home/CreditSection";
import HowItWorks from "@/components/home/HowItWorks";
import ReviewsSection from "@/components/home/ReviewsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Автомобили в наличии и под заказ в Казахстане`,
  description: "Easy Motors — автосалон в Алматы. Широкий выбор автомобилей в наличии и под заказ. Кредит от 18%, оформление за 1 день.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AdvantagesSection />
      <PopularCars />
      <CreditSection />
      <HowItWorks />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
