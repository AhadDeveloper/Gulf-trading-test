import Link from "next/link";

export default function ProjectInfoCard() {
  return (
    <div className="w-[95%] max-w-xl mx-auto bg-white rounded-xl shadow-md border p-6">
      {/* Heading */}
      <h2 className="text-lg md:text-xl font-bold text-center mb-3">
        Welcome to Long Term Investment Project Company
      </h2>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed mb-5">
        Gulf Trading is a global forest products trading and financing company.
        Our traders comprise more than 200 years of trading experience and with
        our agents network we do business in more than 30 countries. Our
        Company, Gulf Trading, evolved from Gulf Lumber Company, a family owned
        sawmill and treating plant, located in Mobile, Alabama dating back to
        1940. Our home office is in Mobile, Alabama. We are an importer and
        exporter of quality forest products and building materials from around
        the world.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:gap-4 gap-3">
        {/* Register & Login together on row */}
        <div className="flex gap-4 sm:flex-1">
          <Link
            href="/signup"
            className="flex-1 text-center py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Register
          </Link>

          <Link
            href="/login"
            className="flex-1 text-center py-2 rounded-lg border border-green-600 text-green-600 font-medium hover:bg-green-50 transition"
          >
            Login
          </Link>
        </div>

        {/* Dashboard on new line or side by side on larger screens */}
        <Link
          href="/dashboard"
          className="flex-1 text-center py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
