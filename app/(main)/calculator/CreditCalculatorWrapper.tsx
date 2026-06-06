"use client";

import { useSearchParams } from "next/navigation";
import CreditCalculator from "@/components/calculator/CreditCalculator";

export default function CreditCalculatorWrapper() {
  const params = useSearchParams();
  const price = params.get("price");
  const name = params.get("name");

  return (
    <CreditCalculator
      initialPrice={price ? parseInt(price) : undefined}
      carName={name ?? undefined}
    />
  );
}
