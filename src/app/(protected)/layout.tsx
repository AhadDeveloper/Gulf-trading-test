import ProtectedNavbar from "@/components/layout/ProtectedNavbar";
import { Toaster } from "@/components/ui/sonner";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedNavbar /> {/* Full-feature navbar */}
      <main className="pt-10 bg-gray-50 min-h-screen">{children}</main>
      <Toaster richColors position="top-center" />
    </>
  );
}
