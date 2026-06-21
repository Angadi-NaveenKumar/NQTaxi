import {
  FaMapMarkerAlt,
  FaLocationArrow,
  FaUser,
  FaStar,
} from "react-icons/fa";

export default function RideRequestCard({
  request,
}) {
  return (
    <div className="rounded-3xl bg-[#1A1A1A] p-5 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-bold text-lg">
            New Ride Request
          </h3>

          
        </div>

        <div className="flex items-center gap-1">
          <FaStar className="text-[#F5C518]" />
          <span className="text-white">
            {request.passengerRating}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <FaMapMarkerAlt className="text-[#4CAF50] mt-1" />
          <div>
            <p className="text-xs text-[#B0B0B0]">
              Pickup
            </p>
            <p className="text-white">
              {request.pickup}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <FaLocationArrow className="text-[#F44336] mt-1" />
          <div>
            <p className="text-xs text-[#B0B0B0]">
              Drop
            </p>
            <p className="text-white">
              {request.drop}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaUser className="text-[#2196F3]" />
          <span className="text-white">
           Passenger 
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        <div>
          <p className="text-[#B0B0B0] text-xs">
            Distance
          </p>

          <p className="text-white font-semibold">
            {request.distance}
          </p>
        </div>

        <div>
          <p className="text-[#B0B0B0] text-xs">
            Duration
          </p>

          <p className="text-white font-semibold">
            {request.duration}
          </p>
        </div>

        <div>
          <p className="text-[#B0B0B0] text-xs">
            Fare
          </p>

          <p className="text-[#F5C518] font-bold">
            ₹{request.fare}
          </p>
        </div>
      </div>
    </div>
  );
}