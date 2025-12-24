import { Card, CardContent } from "@/components/ui/card";

export default function DashboardStatsSkeleton() {
  return (
    <Card className="max-w-md mx-auto w-[95%] animate-pulse">
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-gray-100 p-4 flex flex-col items-center text-center gap-2"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="w-20 h-3 bg-gray-300 rounded" />
              <div className="w-14 h-4 bg-gray-400 rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
