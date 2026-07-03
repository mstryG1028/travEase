import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function BookingSuccessModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex justify-center">
          <FaCheckCircle className="text-6xl text-green-500" />
        </div>

        <h2 className="mt-4 text-center text-2xl font-bold">
          Booking Confirmed 🎉
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Your booking has been created successfully.
        </p>

        <div className="mt-6 space-y-3 rounded-xl bg-gray-50 p-4">
          <div className="flex justify-between">
            <span>Booking ID</span>
            <span className="font-semibold">{booking.bookingId}</span>
          </div>

          <div className="flex justify-between">
            <span>Check In</span>
            <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Check Out</span>
            <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Amount</span>
            <span className="font-semibold">₹ {booking.totalAmount}</span>
          </div>

          <div className="border-t pt-3">
            <p className="font-semibold">Contact Person</p>

            <p>{booking.contactPerson?.name}</p>

            <p>{booking.contactPerson?.phone}</p>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border py-3 hover:bg-gray-100"
          >
            Close
          </button>

          <Link
            to={`/bookings/${booking._id}`}
            className="flex-1 rounded-xl bg-[var(--primary)] py-3 text-center text-white hover:opacity-90"
          >
            View Booking
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessModal;
