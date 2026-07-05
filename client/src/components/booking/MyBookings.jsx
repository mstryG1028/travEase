import { useEffect, useState } from "react";

import { successToast, errorToast } from "../../utils/toast";

import { getMyBookings, cancelBooking } from "../../services/booking.service";

import Loader from "../../components/ui/Loader";
import BookingCard from "../../components/booking/BookingCard";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const response = await getMyBookings();

      setBookings(response.data.data || []);
    } catch (err) {
      errorToast("Unable to fetch bookings");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {
    try {
      await cancelBooking(id);

      successToast("Booking Cancelled");

      fetchBookings();
    } catch (err) {
      errorToast("Cancellation Failed");
    }
  }

  if (loading) return <Loader />;

  return (
    <section className="container-theme py-10">
      <h1 className="mb-8 text-4xl font-bold text-theme">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="card-theme p-10 text-center">
          <h2 className="text-2xl font-semibold text-theme">No Bookings Yet</h2>

          <p className="mt-2 text-muted">Your bookings will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="space-y-4">
              <BookingCard booking={booking} />

              {booking.bookingStatus !== "CANCELLED" && (
                <div className="flex justify-end">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="btn-danger"
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyBookings;
