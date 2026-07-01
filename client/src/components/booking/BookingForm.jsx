import { useState } from "react";
import { createBooking } from "../../services/booking.service";

function BookingForm({ listing }) {
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [loading, setLoading] = useState(false);

  function calculateNights() {
    if (!form.checkIn || !form.checkOut) return 0;

    const checkIn = new Date(form.checkIn);
    const checkOut = new Date(form.checkOut);

    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  }

  async function handleBooking(e) {
    e.preventDefault();

    const totalNights = calculateNights();

    if (totalNights <= 0) {
      return alert("Select valid dates");
    }

    const taxes = 500;
    const serviceFee = 200;
    const discount = 0;

    const totalAmount =
      listing.currentPrice * totalNights + taxes + serviceFee - discount;

    try {
      setLoading(true);

      await createBooking({
        listing: listing._id,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests),
        totalNights,
        taxes,
        serviceFee,
        discount,
        totalAmount,
      });

      alert("Booking Created Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleBooking}
      className="w-full max-w-sm border rounded-2xl p-6 shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Reserve</h2>

      <div>
        <label>Check In</label>

        <input
          type="date"
          className="input w-full"
          value={form.checkIn}
          onChange={(e) =>
            setForm({
              ...form,
              checkIn: e.target.value,
            })
          }
          required
        />
      </div>

      <div>
        <label>Check Out</label>

        <input
          type="date"
          className="input w-full"
          value={form.checkOut}
          onChange={(e) =>
            setForm({
              ...form,
              checkOut: e.target.value,
            })
          }
          required
        />
      </div>

      <div>
        <label>Guests</label>

        <input
          type="number"
          min="1"
          max={listing.guests}
          className="input w-full"
          value={form.guests}
          onChange={(e) =>
            setForm({
              ...form,
              guests: e.target.value,
            })
          }
        />
      </div>

      <div className="font-semibold">₹ {listing.currentPrice} / night</div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Booking..." : "Reserve"}
      </button>
    </form>
  );
}

export function BookingFormWrapper(props) {
  return <BookingForm {...props} />;
}

export { BookingForm };

export default BookingForm;
