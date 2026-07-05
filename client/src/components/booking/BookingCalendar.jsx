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
      <div className="grid gap-4 md:grid-cols-2">
        {/* Check In */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-theme">
            Check In
          </label>

          <div className="relative">
            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              minDate={new Date()}
              excludeDates={blockedDates}
              placeholderText="Select check-in"
              dateFormat="dd MMM yyyy"
              className="input-theme pl-12"
            />
          </div>
        </div>

        {/* Check Out */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-theme">
            Check Out
          </label>

          <div className="relative">
            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              minDate={checkIn || new Date()}
              excludeDates={blockedDates}
              placeholderText="Select check-out"
              dateFormat="dd MMM yyyy"
              className="input-theme pl-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCalendar;
