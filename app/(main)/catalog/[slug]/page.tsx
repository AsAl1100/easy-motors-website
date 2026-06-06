import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MessageCircle, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CarGallery from "@/components/car/CarGallery";
import CarSpecs from "@/components/car/CarSpecs";
import SimilarCars from "@/components/car/SimilarCars";
import CreditCalculator from "@/components/calculator/CreditCalculator";
import ApplicationForm from "@/components/forms/ApplicationForm";
import { DEMO_CARS } from "@/lib/data";
import { formatPrice, getCarWhatsAppMessage, getWhatsAppLink } from "@/lib/utils";
import { WHATSAPP_PHONE, PHONE_NUMBER, SITE_NAME } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DEMO_CARS.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = DEMO_CARS.find((c) => c.slug === slug);
  if (!car) return {};

  const name = `${car.brand} ${car.model} ${car.year}`;
  return {
    title: `${name} — ${formatPrice(car.price)} | ${SITE_NAME}`,
    description: car.description,
    openGraph: {
      title: name,
      description: car.description,
      images: car.images?.map((img) => ({ url: img.url })),
    },
  };
}

export default async function CarPage({ params }: Props) {
  const { slug } = await params;
  const car = DEMO_CARS.find((c) => c.slug === slug);
  if (!car) notFound();

  const displayName = `${car.brand} ${car.model} ${car.year}`;
  const waMsg = getCarWhatsAppMessage(displayName, car.price);
  const waLink = getWhatsAppLink(WHATSAPP_PHONE, waMsg);

  return (
    <div className="pt-20 min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Главная</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/catalog" className="hover:text-foreground transition-colors">Каталог</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium truncate">{displayName}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Gallery + Specs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            {car.images && car.images.length > 0 && (
              <CarGallery images={car.images} alt={displayName} />
            )}

            {/* Description */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-3">Описание</h2>
              <p className="text-muted-foreground leading-relaxed">{car.description}</p>
            </div>

            {/* Specs */}
            <CarSpecs car={car} />

            {/* Credit Calculator */}
            <CreditCalculator initialPrice={car.price} carName={displayName} />
          </div>

          {/* Right — Price + Form */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.is_new && <Badge variant="new">Новый</Badge>}
                  <Badge variant="outline">{car.year}</Badge>
                  <Badge variant="outline">{car.body_type}</Badge>
                </div>

                <h1 className="text-2xl font-bold mb-1">{car.brand} {car.model}</h1>
                <p className="text-muted-foreground text-sm mb-4">{car.year} · {car.engine_volume}L {car.fuel_type} · {car.transmission}</p>

                <div className="mb-5">
                  <p className="text-3xl font-bold text-primary">{formatPrice(car.price)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    В кредит от {formatPrice(Math.round(calcApprox(car.price)))}/мес.
                  </p>
                </div>

                <div className="space-y-2">
                  <Button asChild size="lg" className="w-full">
                    <a href={`tel:${PHONE_NUMBER}`}>
                      <Phone className="w-5 h-5" />
                      Позвонить
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="whatsapp" className="w-full">
                    <a href={waLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              {/* Application Form */}
              <div className="bg-card border border-border rounded-xl p-6">
                <ApplicationForm
                  type="car"
                  carId={car.id}
                  carName={displayName}
                  title="Оставить заявку"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        <SimilarCars currentCar={car} />
      </div>
    </div>
  );
}

function calcApprox(price: number): number {
  const loan = price * 0.8;
  const rate = 0.18 / 12;
  const n = 84;
  return (loan * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
}
