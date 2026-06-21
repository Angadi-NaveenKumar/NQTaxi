export default function RideRequestActions({
  onAccept,
  onDecline,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={onDecline}
        className="rounded-2xl border border-[#F44336] py-4 font-bold text-[#F44336]"
      >
        Decline
      </button>

      <button
        onClick={onAccept}
        className="rounded-2xl bg-[#4CAF50] py-4 font-bold text-white"
      >
        Accept Ride
      </button>
    </div>
  );
}