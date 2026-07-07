import { useState, useEffect } from "react";
import { successToast, errorToast } from "../../utils/toast";
import BookingCalendar from "./BookingCalendar";
import BookingSuccessModal from "./BookingSuccessModal";
import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";
import {
  createBooking,
  getUnavailableDates,
} from "../../services/booking.service";

function BookingForm({ listing }) {
  const { user, loading: authLoading } = useAuth();

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

      setBlockedDates((res.data.data || []).map((date) => new Date(date)));
    } catch (err) {
      console.log(err);
    }
  }

  function calculateNights() {
    if (!checkIn || !checkOut) return 0;

    return Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );
  }

  // ===== Used by JSX =====
  const totalNights = calculateNights();

  const taxes = 500;
  const serviceFee = 200;
  const discount = 0;

  const totalAmount =
    listing.currentPrice * totalNights + taxes + serviceFee - discount;

  async function handleBooking(e) {
    e.preventDefault();

    if (authLoading) return;

    if (!user) {
      errorToast("Please login to book this property.");
      return;
    }

    if (!checkIn || !checkOut) {
      errorToast("Please select check-in and check-out dates.");
      return;
    }

    if (totalNights <= 0) {
      errorToast("Invalid booking dates.");
      return;
    }

    try {
      setLoading(true);

      console.log({
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

      successToast("Booking confirmed successfully.");

      setBooking(res.data.data);

      await loadUnavailableDates();

      setCheckIn(null);
      setCheckOut(null);
      setGuests(1);
    } catch (err) {
      console.log(err.response?.data);

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

        <div>
          <label className="mb-2 block font-semibold text-theme">Guests</label>

          <input
            type="number"
            min="1"
            max={listing.guests}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="input-theme"
          />

          <p className="mt-2 text-xs text-muted">
            Maximum {listing.guests} guests allowed.
          </p>
        </div>

        {checkIn && checkOut && totalNights > 0 && (
          <div className="price-card space-y-3">
            <h3 className="font-semibold text-lg">Price Details</h3>

            <div className="flex justify-between">
              <span>
                ₹{listing.currentPrice} × {totalNights} night(s)
              </span>

              <span>₹{listing.currentPrice * totalNights}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>

            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>₹{serviceFee}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        )}

        <Button type="submit" fullWidth loading={loading} disabled={loading}>
          {loading ? "Booking..." : "Reserve Now"}
        </Button>
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
