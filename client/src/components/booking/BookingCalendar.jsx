import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingCalendar({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  blockedDates,
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="font-medium">Check In</label>

        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          minDate={new Date()}
          excludeDates={blockedDates}
          placeholderText="Select Check In"
          className="input w-full"
          dateFormat="dd MMM yyyy"
        />
      </div>

      <div>
        <label className="font-medium">Check Out</label>

        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          minDate={checkIn || new Date()}
          excludeDates={blockedDates}
          placeholderText="Select Check Out"
          className="input w-full"
          dateFormat="dd MMM yyyy"
        />
      </div>
    </div>
  );
}

export default BookingCalendar;
