import { Link } from "react-router-dom";

import {
  FaCheckCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaReceipt,
} from "react-icons/fa";

function BookingSuccessModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          relative
          w-full
          max-w-[420px]
          rounded-3xl
          bg-surface
          shadow-theme-lg
          overflow-hidden
          animate-scaleIn
        "
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            text-xl
            text-theme
            hover:opacity-70
            transition
          "
        >
          ✕
        </button>

        {/* Success Header */}

        <div
          className="
            flex
            flex-col
            items-center
            px-6
            pt-8
            pb-6
            border-b
            border-theme
          "
        >
          <div
            className="
              h-20
              w-20
              rounded-full
              bg-[var(--success-light)]
              flex
              items-center
              justify-center
            "
          >
            <FaCheckCircle
              className="
                text-5xl
                text-success
              "
            />
          </div>

          <h2
            className="
              mt-5
              text-2xl
              font-bold
              text-theme
            "
          >
            Booking Confirmed!
          </h2>

          <p
            className="
              mt-2
              text-center
              text-sm
              text-muted
            "
          >
            Your booking has been successfully created.
          </p>
        </div>

        {/* Booking Details */}

        <div
          className="
            px-6
            py-5
            space-y-4
          "
        >
          <Row
            icon={<FaReceipt />}
            label="Booking ID"
            value={booking.bookingId}
          />

          <Row
            icon={<FaCalendarAlt />}
            label="Check In"
            value={new Date(booking.checkIn).toLocaleDateString()}
          />

          <Row
            icon={<FaCalendarAlt />}
            label="Check Out"
            value={new Date(booking.checkOut).toLocaleDateString()}
          />

          <Row
            icon={<FaUsers />}
            label="Guests"
            value={`${booking.guests} Guest${booking.guests > 1 ? "s" : ""}`}
          />

          <div
            className="
              border-t
              border-theme
              pt-4
            "
          >
            <Row
              icon={<FaMoneyBillWave />}
              label="Total Paid"
              value={`₹${booking.totalAmount}`}
              valueClass="
                text-success
                text-xl
                font-bold
              "
            />
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            border-t
            border-theme
            p-5
            flex
            flex-col
            gap-3
          "
        >
          <Link
            to="/my-bookings"
            onClick={onClose}
            className="
              btn-primary
              w-full
              text-center
            "
          >
            View My Bookings
          </Link>

          <button
            onClick={onClose}
            className="
              btn-outline
              w-full
            "
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  icon,

  label,

  value,

  valueClass = "text-theme font-semibold",
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          text-muted
        "
      >
        <span
          className="
            text-brand
          "
        >
          {icon}
        </span>

        <span>{label}</span>
      </div>

      <span
        className={`
          text-right
          ${valueClass}
        `}
      >
        {value}
      </span>
    </div>
  );
}

export default BookingSuccessModal;
