import CarCard from "@/components/catalog/CarCard";
import type { Car } from "@/types";

interface Props {
  currentCar: Car;
  similar?: Car[];
}

export default function SimilarCars({ currentCar, similar = [] }: Props) {
  if (!similar.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Похожие автомобили</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
