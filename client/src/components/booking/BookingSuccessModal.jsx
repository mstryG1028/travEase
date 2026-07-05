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
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-[fadeIn_.3s_ease]">
        {/* Header */}

        <div className="bg-gradient-to-r from-[var(--primary)] to-red-500 p-8 text-center text-white">
          <FaCheckCircle className="mx-auto text-6xl" />

          <h2 className="mt-4 text-3xl font-bold">Booking Confirmed!</h2>

          <p className="mt-2 text-white/90">
            Your reservation has been successfully created.
          </p>
        </div>

        {/* Body */}

        <div className="space-y-5 p-7">
          <div className="rounded-2xl bg-[var(--background)] p-5 border">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-gray-500">
                <FaReceipt className="text-[var(--primary)]" />
                Booking ID
              </div>

              <span className="font-semibold">{booking.bookingId}</span>
            </div>

            <hr className="my-2" />

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-gray-500">
                <FaCalendarAlt className="text-[var(--primary)]" />
                Check In
              </div>

              <span className="font-medium">
                {new Date(booking.checkIn).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-gray-500">
                <FaCalendarAlt className="text-[var(--primary)]" />
                Check Out
              </div>

              <span className="font-medium">
                {new Date(booking.checkOut).toLocaleDateString()}
              </span>
            </div>

            <hr className="my-2" />

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-gray-500">
                <FaMoneyBillWave className="text-green-600" />
                Total Paid
              </div>

              <span className="text-2xl font-bold text-[var(--primary)]">
                ₹ {booking.totalAmount}
              </span>
            </div>
          </div>

          {/* Host */}

          <div className="rounded-2xl border p-5 bg-white">
            <h3 className="mb-4 text-lg font-semibold">Host Contact</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <FaUserTie className="text-[var(--primary)]" />
                </div>

                <span>{booking.contactPerson?.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <FaPhoneAlt className="text-[var(--primary)]" />
                </div>

                <span>{booking.contactPerson?.phone}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex gap-4 pt-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-100"
            >
              Close
            </button>

            <Link
              to={`/bookings/${booking._id}`}
              className="flex-1 rounded-xl bg-[var(--primary)] py-3 text-center font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
            >
              View Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessModal;
