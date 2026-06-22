export default function OnlineToggle({
  isOnline,
  onToggle,
}) {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-4 mb-5">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg text-white">
            {isOnline ? "Online" : "Offline"}
          </h3>

          <p className="text-sm text-[#B0B0B0]">
            {isOnline
              ? "Waiting for ride requests..."
              : "Go online to receive rides"}
          </p>
        </div>

        <button
          onClick={onToggle}
          className={`w-16 h-8 rounded-full transition-all ${
            isOnline
              ? "bg-[#4CAF50]"
              : "bg-gray-600"
          }`}
        >
          <div
            className={`h-7 w-7 bg-white rounded-full transition-all duration-300 ${
              isOnline
                ? "translate-x-8"
                : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}