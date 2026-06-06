import { Separator } from "@/components/ui/separator";
import type { Car } from "@/types";

interface Props {
  car: Car;
}

export default function CarSpecs({ car }: Props) {
  const specs = [
    { label: "Марка", value: car.brand },
    { label: "Модель", value: car.model },
    { label: "Год выпуска", value: `${car.year}` },
    { label: "Тип кузова", value: car.body_type },
    { label: "Двигатель", value: `${car.engine_volume}L, ${car.engine_power} л.с.` },
    { label: "Топливо", value: car.fuel_type },
    { label: "Коробка передач", value: car.transmission },
    { label: "Привод", value: car.drive_type },
    { label: "Пробег", value: car.mileage === 0 ? "Новый (0 км)" : `${car.mileage.toLocaleString()} км` },
    { label: "Цвет", value: car.color },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold text-lg mb-5">Характеристики</h3>
      <div className="space-y-0">
        {specs.map((spec, i) => (
          <div key={spec.label}>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-muted-foreground">{spec.label}</span>
              <span className="text-sm font-medium text-right max-w-[60%]">{spec.value}</span>
            </div>
            {i < specs.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
}
