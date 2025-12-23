"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
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

export default function InvestPage() {
  const params = useParams();
  const planId = Number(params.id);
  const plan = plans.find((p) => p.id === planId);

  const [mobile, setMobile] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("JazzCash");
  const [transactionId, setTransactionId] = useState("");

  const mobileNumbers = ["03001234567", "03109876543"];

  if (!plan) return <p>Plan not found</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ planId: plan.id, mobile, paymentMethod, transactionId });
    alert("Deposit submitted successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">{plan.name} Package</h2>
      <p className="mb-4">Amount: Rs {plan.price}</p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Mobile Number</label>
          <select
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Number</option>
            {mobileNumbers.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="JazzCash">JazzCash</option>
            <option value="Easypaisa">Easypaisa</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Transaction ID</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
