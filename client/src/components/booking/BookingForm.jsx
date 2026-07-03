import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import BookingCalendar from "./BookingCalendar";
import BookingSuccessModal from "./BookingSuccessModal";

import {
  createBooking,
  getUnavailableDates,
} from "../../services/booking.service";

function BookingForm({ listing }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);

  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    if (listing?._id) {
      loadUnavailableDates();
    }
  }, [listing]);

  async function loadUnavailableDates() {
    try {
      const res = await getUnavailableDates(listing._id);

      // Backend returns ["2025-08-01","2025-08-02"...]
      setBlockedDates((res.data.data || []).map((date) => new Date(date)));
    } catch (err) {
      console.log(err);
    }
  }

  function calculateNights() {
    if (!checkIn || !checkOut) return 0;

    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  }

  async function handleBooking(e) {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      toast.error("Please select dates");
      return;
    }

    const totalNights = calculateNights();

    if (totalNights <= 0) {
      toast.error("Invalid dates selected");
      return;
    }

    const taxes = 500;
    const serviceFee = 200;
    const discount = 0;

    const totalAmount =
      listing.currentPrice * totalNights + taxes + serviceFee - discount;

    try {
      setLoading(true);

      const res = await createBooking({
        listing: listing._id,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests: Number(guests),
        totalNights,
        taxes,
        serviceFee,
        discount,
        totalAmount,
      });

      toast.success("Booking Successful 🎉");

      setBooking(res.data.data);

      await loadUnavailableDates();

      setCheckIn(null);
      setCheckOut(null);
      setGuests(1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleBooking}
        className="w-full max-w-sm rounded-2xl border p-6 shadow space-y-5"
      >
        <h2 className="text-2xl font-bold">Reserve</h2>

        <BookingCalendar
          checkIn={checkIn}
          checkOut={checkOut}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
          blockedDates={blockedDates}
        />

        <div>
          <label className="block mb-2 font-medium">Guests</label>

          <input
            type="number"
            min="1"
            max={listing.guests}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="input w-full"
          />
        </div>

        <div className="text-lg font-semibold">
          ₹ {listing.currentPrice} / night
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Booking..." : "Reserve"}
        </button>
      </form>

      {booking && (
        <BookingSuccessModal
          booking={booking}
          onClose={() => setBooking(null)}
        />
      )}
    </>
  );
}

export default BookingForm;
