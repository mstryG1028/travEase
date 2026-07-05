import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUserTie,
  FaPhoneAlt,
  FaReceipt,
} from "react-icons/fa";

function BookingSuccessModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-theme-lg bg-surface shadow-theme-lg animate-[fadeIn_.3s_ease]">
        {/* Header */}

        <div className="gradient-primary p-8 text-center">
          <FaCheckCircle className="mx-auto text-6xl" />

          <h2 className="mt-4 text-3xl font-bold">Booking Confirmed!</h2>

          <p className="mt-2 text-white/90">
            Your reservation has been successfully created.
          </p>
        </div>

        {/* Body */}

        <div className="space-y-5 p-7">
          {/* Booking Details */}

          <div className="price-card">
            <InfoRow
              icon={<FaReceipt className="text-brand" />}
              label="Booking ID"
              value={booking.bookingId}
            />

            <hr className="my-2 border-theme" />

            <InfoRow
              icon={<FaCalendarAlt className="text-brand" />}
              label="Check In"
              value={new Date(booking.checkIn).toLocaleDateString()}
            />

            <InfoRow
              icon={<FaCalendarAlt className="text-brand" />}
              label="Check Out"
              value={new Date(booking.checkOut).toLocaleDateString()}
            />

            <hr className="my-2 border-theme" />

            <InfoRow
              icon={<FaMoneyBillWave className="text-success" />}
              label="Total Paid"
              value={`₹ ${booking.totalAmount}`}
              valueClass="text-brand text-2xl font-bold"
            />
          </div>

          {/* Host */}

          <div className="card-theme p-5">
            <h3 className="mb-4 text-lg font-semibold text-theme">
              Host Contact
            </h3>

            <div className="space-y-3">
              <HostItem
                icon={<FaUserTie />}
                text={booking.contactPerson?.name}
              />

              <HostItem
                icon={<FaPhoneAlt />}
                text={booking.contactPerson?.phone}
              />
            </div>
          </div>

          {/* Buttons */}

          <div className="flex gap-4">
            <button onClick={onClose} className="btn-outline flex-1">
              Close
            </button>

            <Link
              to={`/bookings/${booking._id}`}
              className="btn-primary flex-1 text-center"
            >
              View Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  valueClass = "font-medium text-theme",
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2 text-muted">
        {icon}
        {label}
      </div>

      <span className={valueClass}>{value}</span>
    </div>
  );
}

function HostItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2">
        <span className="text-brand">{icon}</span>
      </div>

      <span className="text-theme">{text}</span>
    </div>
  );
}

export default BookingSuccessModal;
