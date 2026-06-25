// RecentBookings.jsx
import React from 'react';

export const recentBookings = [
  {
    id: '#NQ123456',
    user: { name: 'Rahul Sharma', avatar: 'RS' },
    pickup: 'Connaught Place',
    drop: 'Noida Sector 62',
    driver: { name: 'Amit Verma', avatar: 'AV' },
    fare: 520,
    status: 'completed',
  },
  {
    id: '#NQ123457',
    user: { name: 'Priya Singh', avatar: 'PS' },
    pickup: 'Gurgaon',
    drop: 'IGI Airport',
    driver: { name: 'Vikram Rao', avatar: 'VR' },
    fare: 750,
    status: 'completed',
  },
  {
    id: '#NQ123458',
    user: { name: 'Arjun Mehta', avatar: 'AM' },
    pickup: 'Karol Bagh',
    drop: 'Dwarka',
    driver: { name: 'Sandeep Y.', avatar: 'SY' },
    fare: 430,
    status: 'ongoing',
  },
  {
    id: '#NQ123459',
    user: { name: 'Neha Kapoor', avatar: 'NK' },
    pickup: 'Saket',
    drop: 'Noida City',
    driver: { name: 'Manoj Kumar', avatar: 'MK' },
    fare: 610,
    status: 'ongoing',
  },
  {
    id: '#NQ123460',
    user: { name: 'Karan Malhotra', avatar: 'KM' },
    pickup: 'Lajpat Nagar',
    drop: 'Gurgaon',
    driver: { name: 'Rohit Singh', avatar: 'RS' },
    fare: 890,
    status: 'cancelled',
  },
];

// Optional: A React component to display the bookings
const RecentBookingsList = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
      <div className="space-y-3">
        {recentBookings.map((booking) => (
          <div key={booking.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{booking.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p><span className="font-medium">Pickup:</span> {booking.pickup}</p>
                  <p><span className="font-medium">Drop:</span> {booking.drop}</p>
                  <p><span className="font-medium">Fare:</span> ₹{booking.fare}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  {booking.user.avatar}
                </div>
                <p className="text-sm font-medium mt-1">{booking.user.name}</p>
                <p className="text-xs text-gray-500">Driver: {booking.driver.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBookingsList;