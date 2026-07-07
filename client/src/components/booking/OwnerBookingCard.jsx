import { FaCalendarAlt, FaUser, FaPhone, FaHome } from "react-icons/fa";

function OwnerBookingCard({ booking }) {
  const {
    listing,
    guest,
    checkIn,
    checkOut,
    guests,
    totalAmount,
    bookingStatus,
  } = booking;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm hover:shadow-lg transition">
      {/* Property Info */}
      <div className="flex gap-4 mb-5">
        <img
          src={listing?.image?.url || "/placeholder.png"}
          alt={listing?.title}
          className="h-20 w-20 rounded-xl object-cover"
        />

        <div>
          <h2 className="text-lg font-bold text-primary">{listing?.title}</h2>

          <p className="flex items-center gap-2 text-secondary text-sm">
            <FaHome />
            {listing?.location}
          </p>
        </div>
      </div>

      {/* Booking Details */}
      <div className="space-y-3 border-t border-border pt-4">
        <p className="flex items-center gap-2 text-secondary">
          <FaUser />
          Guest:
          <span className="text-primary font-medium">{guest?.fullName}</span>
        </p>

        <p className="flex items-center gap-2 text-secondary">
          <FaPhone />
          Phone:
          <span className="text-primary">{booking?.contactPerson?.phone}</span>
        </p>

        <p className="flex items-center gap-2 text-secondary">
          <FaCalendarAlt />
          Dates:
          <span className="text-primary">
            {new Date(checkIn).toLocaleDateString()}
            {" - "}
            {new Date(checkOut).toLocaleDateString()}
          </span>
        </p>

        <p className="text-secondary">
          Guests:
          <span className="text-primary ml-2">{guests}</span>
        </p>

        <p className="text-secondary">
          Earnings:
          <span className="text-accent font-semibold ml-2">₹{totalAmount}</span>
        </p>
      </div>

      {/* Status */}
      <div className="mt-5">
        <span
          className={`rounded-full px-4 py-1 text-sm font-medium
          ${
            bookingStatus === "Confirmed"
              ? "bg-green-500/10 text-green-400"
              : bookingStatus === "Cancelled"
                ? "bg-red-500/10 text-red-400"
                : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {bookingStatus}
        </span>
      </div>
    </div>
  );
}

export default OwnerBookingCard;
