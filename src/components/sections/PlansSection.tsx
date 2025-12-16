import PlanCard from "../cards/PlanCard";
import { Plan } from "@/types";

const plans: Plan[] = [
  { id: 1, name: "Gulf-01", price: 465, daily: 77, total: 2695 },
  { id: 2, name: "Gulf-02", price: 1165, daily: 194, total: 6790 },
  { id: 3, name: "Gulf-03", price: 2465, daily: 410, total: 14350 },
  { id: 4, name: "Gulf-04", price: 4465, daily: 744, total: 26040 },
  { id: 5, name: "Gulf-05", price: 5865, daily: 977, total: 34195 },
  { id: 6, name: "Gulf-06", price: 10365, daily: 1727, total: 60445 },
  { id: 7, name: "Gulf-07", price: 18065, daily: 3010, total: 105350 },
  { id: 8, name: "Gulf-08", price: 26565, daily: 4427, total: 154945 },
  { id: 9, name: "Gulf-09", price: 52565, daily: 8760, total: 306600 },
  { id: 10, name: "Gulf-10", price: 102565, daily: 17094, total: 598290 },
  { id: 11, name: "Gulf-11", price: 153565, daily: 25594, total: 895790 },
  { id: 12, name: "Gulf-12", price: 273565, daily: 45594, total: 1595790 },
];

export default function PlansSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Our Plans
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <p className="text-center text-xs text-gray-500 mt-10">
        © 2025 All Rights Reserved.
      </p>
    </section>
  );
}
