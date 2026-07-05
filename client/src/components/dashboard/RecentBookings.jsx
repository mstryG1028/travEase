function RecentBookings({ bookings = [] }) {
  return (
    <div className="dashboard-card">
      <h2 className="mb-6 text-2xl font-bold text-theme">Recent Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-muted">No Bookings Yet</p>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex items-center justify-between border-b border-theme pb-3"
            >
              <div>
                <h3 className="font-semibold text-theme">
                  {booking.listing.title}
                </h3>

                <p className="mt-1 text-sm text-muted">
                  {booking.guest.fullName}
                </p>
              </div>

              <span className="font-bold text-theme">
                ₹ {booking.totalAmount}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentBookings;
