import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getMyBookings, cancelBooking } from "../../services/booking.service";

import Loader from "../../components/ui/Loader";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getMyBookings();

      setBookings(response.data.data || []);
    } catch (error) {
      toast.error("Unable to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);

      toast.success("Booking Cancelled");

      fetchBookings();
    } catch (error) {
      toast.error("Cancellation Failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="max-w-6xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold">{booking.listing?.title}</h2>

            <p>
              {new Date(booking.checkIn).toLocaleDateString()} →{" "}
              {new Date(booking.checkOut).toLocaleDateString()}
            </p>

            <p>Guests : {booking.guests}</p>

            <p>
              Status :<strong> {booking.bookingStatus}</strong>
            </p>

            <p className="font-bold mt-2">₹{booking.totalAmount}</p>

            {booking.bookingStatus !== "Cancelled" && (
              <button
                onClick={() => handleCancel(booking._id)}
                className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyBookings;
