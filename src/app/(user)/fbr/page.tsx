import Image from "next/image";
import FbrImage from "@/assets/fbr.jpg";

export default function FbrPage() {
  return (
    <div className="px-4 pb-6">
      <Image
        src={FbrImage}
        alt="FBR Online Check"
        className="rounded-xl shadow-lg"
        priority
      />
    </div>
  );
}
