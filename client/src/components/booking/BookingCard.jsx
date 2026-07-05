import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";

function BookingCard({ booking }) {
  const statusClass = {
    COMPLETED: "bg-[var(--success)]",
    PENDING: "bg-[var(--warning)]",
    CANCELLED: "bg-[var(--danger)]",
  };

  return (
    <div className="card-theme overflow-hidden">
      {/* Image */}

      <div className="relative">
        <img
          src={
            booking.listing.image?.url ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={booking.listing.title}
          className="h-60 w-full object-cover"
        />

        <span
          className={`absolute right-4 top-4 rounded-full px-4 py-2 text-sm font-semibold text-white ${
            statusClass[booking.bookingStatus] || "bg-[var(--text-secondary)]"
          }`}
        >
          {booking.bookingStatus}
        </span>
      </div>

      {/* Content */}

      <div className="card-padding space-y-5">
        {/* Title */}

        <div>
          <h2 className="text-2xl font-bold text-theme">
            {booking.listing.title}
          </h2>

          <p className="mt-2 flex items-center gap-2 text-muted">
            <FaMapMarkerAlt className="text-brand" />
            {booking.listing.city}, {booking.listing.state}
          </p>
        </div>

        {/* Booking Details */}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <InfoBox
            icon={<FaCalendarAlt />}
            title="Check In"
            value={new Date(booking.checkIn).toLocaleDateString()}
          />

          <InfoBox
            icon={<FaCalendarAlt />}
            title="Check Out"
            value={new Date(booking.checkOut).toLocaleDateString()}
          />

          <InfoBox icon={<FaUsers />} title="Guests" value={booking.guests} />

          <InfoBox
            title="Total Amount"
            value={`₹${booking.totalAmount}`}
            valueClass="text-brand font-bold"
          />
        </div>

        {/* Contact */}

        <div className="rounded-theme border border-theme bg-theme p-4">
          <h3 className="mb-3 font-semibold text-theme">Host Contact</h3>

          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2 text-theme">
              <FaUser className="text-brand" />
              {booking.contactPerson?.name}
            </p>

            <p className="flex items-center gap-2 text-theme">
              <FaPhone className="text-brand" />
              {booking.contactPerson?.phone}
            </p>
          </div>
        </div>

        <Link to={`/bookings/${booking._id}`} className="btn-primary w-full">
          View Booking Details
        </Link>
      </div>
    </div>
  );
}

function InfoBox({
  icon,
  title,
  value,
  valueClass = "text-theme font-semibold",
}) {
  return (
    <div className="rounded-theme bg-surface-2 p-3">
      <p className="flex items-center gap-2 text-sm text-muted">
        {icon}
        {title}
      </p>

      <p className={`mt-1 ${valueClass}`}>{value}</p>
    </div>
  );
}

export default BookingCard;
