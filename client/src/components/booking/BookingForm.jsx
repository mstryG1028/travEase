import { useState, useEffect } from "react";
import { successToast, errorToast } from "../../utils/toast";
import BookingCalendar from "./BookingCalendar";
import BookingSuccessModal from "./BookingSuccessModal";
import Button from "../ui/Button";
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
      errorToast("Please select dates");
      return;
    }

    const totalNights = calculateNights();

    if (totalNights <= 0) {
      errorToast("Invalid dates selected");
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

      successToast("Property listed successfully.");

      setBooking(res.data.data);

      await loadUnavailableDates();

      setCheckIn(null);
      setCheckOut(null);
      setGuests(1);
    } catch (err) {
      errorToast(err.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleBooking} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-theme">Reserve your stay</h2>

          <p className="mt-1 text-sm text-muted">
            {" "}
            Select your travel dates and number of guests.
          </p>
        </div>

        <BookingCalendar
          checkIn={checkIn}
          checkOut={checkOut}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
          blockedDates={blockedDates}
        />

        {/* Guests */}

        <div>
          <label className="mb-2 block font-semibold text-theme">Guests</label>

          <input
            type="number"
            min="1"
            max={listing.guests}
            placeholder={`1 - ${listing.guests} Guests`}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="input-theme"
          />

          <p className="mt-2 text-xs text-muted">
            {" "}
            Maximum {listing.guests} guests allowed.
          </p>
        </div>

        {/* Price Details */}

        {checkIn && checkOut && calculateNights() > 0 && (
          <div className="price-card space-y-3">
            <h3 className="font-semibold text-lg">Price Details</h3>

            <div className="flex justify-between text-muted">
              <span>
                ₹{listing.currentPrice} × {calculateNights()} night(s)
              </span>

              <span>₹{listing.currentPrice * calculateNights()}</span>
            </div>

            <div className="flex justify-between text-muted">
              <span>Taxes</span>

              <span>₹500</span>
            </div>

            <div className="flex justify-between text-muted">
              <span>Service Fee</span>

              <span>₹200</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold text-theme">
              <span>Total</span>

              <span>
                ₹{listing.currentPrice * calculateNights() + 500 + 200}
              </span>
            </div>
          </div>
        )}

        {/* Info */}

        <div className="alert-warning rounded-theme p-4">
          {" "}
          <p className="text-sm">
            {" "}
            🎉 Free cancellation within 24 hours after booking.
          </p>
        </div>

        <Button type="submit" fullWidth loading={loading}>
          Reserve Now
        </Button>

        <p className="text-center text-xs text-muted">
          {" "}
          🔒 Secure booking • No hidden charges
        </p>
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
