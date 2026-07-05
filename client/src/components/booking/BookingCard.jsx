import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";

function BookingCard({ booking }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image */}

      <div className="relative">
        <img
          src={
            booking.listing.image?.url ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={booking.listing.title}
          className="w-full h-60 object-cover"
        />

        <div className="absolute top-4 right-4">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold text-white
            ${
              booking.bookingStatus === "COMPLETED"
                ? "bg-green-500"
                : booking.bookingStatus === "PENDING"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          >
            {booking.bookingStatus}
          </span>
        </div>
      </div>

      {/* Content */}

      <div className="p-6 space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            {booking.listing.title}
          </h2>

          <p className="flex items-center gap-2 text-gray-500 mt-2">
            <FaMapMarkerAlt className="text-[var(--primary)]" />
            {booking.listing.city}, {booking.listing.state}
          </p>
        </div>

        {/* Booking Details */}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-500 flex items-center gap-2">
              <FaCalendarAlt />
              Check In
            </p>

            <p className="font-semibold mt-1">
              {new Date(booking.checkIn).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-500 flex items-center gap-2">
              <FaCalendarAlt />
              Check Out
            </p>

            <p className="font-semibold mt-1">
              {new Date(booking.checkOut).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-500 flex items-center gap-2">
              <FaUsers />
              Guests
            </p>

            <p className="font-semibold mt-1">{booking.guests}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-500">Total Amount</p>

            <p className="font-bold text-[var(--primary)] mt-1">
              ₹{booking.totalAmount}
            </p>
          </div>
        </div>

        {/* Contact */}

        <div className="border rounded-2xl p-4 bg-[var(--background)]">
          <h3 className="font-semibold mb-3">Host Contact</h3>

          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaUser className="text-[var(--primary)]" />
              {booking.contactPerson?.name}
            </p>

            <p className="flex items-center gap-2">
              <FaPhone className="text-[var(--primary)]" />
              {booking.contactPerson?.phone}
            </p>
          </div>
        </div>

        <Link
          to={`/bookings/${booking._id}`}
          className="block text-center bg-[var(--primary)] hover:bg-red-700 transition text-white font-semibold rounded-xl py-3"
        >
          View Booking Details
        </Link>
      </div>
    </div>
  );
}

export default BookingCard;
