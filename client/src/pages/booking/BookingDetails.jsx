import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../../components/ui/Loader";

import { getBookingDetails } from "../../services/booking.service";

function BookingDetails() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooking();
  }, []);

  async function loadBooking() {
    try {
      const res = await getBookingDetails(id);

      setBooking(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <section className="max-w-5xl mx-auto py-10 px-5">
      <div className="bg-white rounded-2xl shadow p-6">
        <img
          src={booking.listing.images?.[0]?.url}
          alt=""
          className="w-full h-64 object-cover rounded-xl"
        />

        <h1 className="text-3xl font-bold mt-5">{booking.listing.title}</h1>

        <p className="text-gray-500">
          {booking.listing.location.city}, {booking.listing.location.state}
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <div className="border rounded-xl p-5">
            <h2 className="font-semibold mb-4">Booking Information</h2>

            <p>
              <strong>Booking ID :</strong> {booking.bookingId}
            </p>

            <p>
              <strong>Check In :</strong>{" "}
              {new Date(booking.checkIn).toLocaleDateString()}
            </p>

            <p>
              <strong>Check Out :</strong>{" "}
              {new Date(booking.checkOut).toLocaleDateString()}
            </p>

            <p>
              <strong>Guests :</strong> {booking.guests}
            </p>

            <p>
              <strong>Status :</strong> {booking.bookingStatus}
            </p>

            <p>
              <strong>Payment :</strong> {booking.paymentStatus}
            </p>

            <p className="text-lg font-bold mt-3">₹ {booking.totalAmount}</p>
          </div>

          <div className="border rounded-xl p-5">
            <h2 className="font-semibold mb-4">Contact Person</h2>

            <p>
              <strong>Name :</strong> {booking.contactPerson?.name}
            </p>

            <p>
              <strong>Phone :</strong> {booking.contactPerson?.phone}
            </p>

            <p>
              <strong>Owner :</strong> {booking.owner.fullName}
            </p>

            <p>
              <strong>Email :</strong> {booking.owner.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingDetails;
