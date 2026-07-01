function RecentBookings({ bookings = [] }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>

      {bookings.length === 0 ? (
        <p>No Bookings Yet</p>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <h3 className="font-semibold">{booking.listing.title}</h3>

                <p className="text-sm text-gray-500">
                  {booking.guest.fullName}
                </p>
              </div>

              <span className="font-bold">₹ {booking.totalAmount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentBookings;
