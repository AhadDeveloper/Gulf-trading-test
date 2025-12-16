export default function UserDetailCard() {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200 w-[90%] sm:w-full">
      {/* Welcome & Balance */}
      <div className="mb-6 text-center">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          Welcome! <span className="text-green-600">ahad005</span>
        </h2>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
          Rs <span>0.0</span>
        </p>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Current Balance
        </p>
      </div>

      {/* Referrer */}
      <div className="mb-6 text-center">
        <p className="text-sm sm:text-base text-gray-500">
          Ref By <span className="font-medium text-gray-700">Adilkhan</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <button className="flex-1 bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition">
          Deposit Plans
        </button>
        <button className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition">
          Withdraw Profit
        </button>
        <button className="flex-1 bg-yellow-500 text-white font-medium py-3 rounded-lg hover:bg-yellow-600 transition">
          My Profit Plans
        </button>
      </div>
    </div>
  );
}
