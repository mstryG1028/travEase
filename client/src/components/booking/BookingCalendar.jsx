import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

function BookingCalendar({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  blockedDates,
}) {
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Check In */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Check In
          </label>

          <div className="relative">
            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              minDate={new Date()}
              excludeDates={blockedDates}
              placeholderText="Select check-in"
              dateFormat="dd MMM yyyy"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
        </div>

        {/* Check Out */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Check Out
          </label>

          <div className="relative">
            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              minDate={checkIn || new Date()}
              excludeDates={blockedDates}
              placeholderText="Select check-out"
              dateFormat="dd MMM yyyy"
              className="w-full pl-12 pr-4  py-3 rounded-xl border border-gray-300 outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default BookingCalendar;