import { Link } from "react-router-dom";

function BookingCard({ booking }) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
      <img
        src={booking.listing.images?.[0]}
        alt={booking.listing.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold">{booking.listing.title}</h2>

        <p className="text-gray-500">
          {booking.listing.city}, {booking.listing.state}
        </p>

        <div>
          <p>
            <strong>Check In:</strong>{" "}
            {new Date(booking.checkIn).toLocaleDateString()}
          </p>

          <p>
            <strong>Check Out:</strong>{" "}
            {new Date(booking.checkOut).toLocaleDateString()}
          </p>
        </div>

        <p>
          <strong>Guests:</strong> {booking.guests}
        </p>

        <p>
          <strong>Total:</strong> ₹{booking.totalAmount}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="font-semibold text-green-600">
            {booking.bookingStatus}
          </span>
        </p>

        <div className="border-t pt-3">
          <p className="font-semibold">Contact Person</p>

          <p>{booking.contactPerson?.name}</p>

          <p>{booking.contactPerson?.phone}</p>
        </div>

        <Link
          to={`/bookings/${booking._id}`}
          className="block w-full bg-[var(--primary)] text-white text-center rounded-xl py-3 mt-3"
        >
          View Booking
        </Link>
      </div>
    </div>
  );
}

export default BookingCard;
