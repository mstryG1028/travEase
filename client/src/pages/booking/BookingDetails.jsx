import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaUsers,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

import Loader from "../../components/ui/Loader";
import ReviewSection from "../../components/review/ReviewSection";
import { getBookingDetails } from "../../services/booking.service";

function BookingDetails() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooking();
  }, [id]);

  async function loadBooking() {
    try {
      const res = await getBookingDetails(id);
      setBooking(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  if (!booking || !booking.listing) {
    return (
      <section className="max-w-6xl mx-auto py-10">
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold">Booking Not Found</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--background)] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}

          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}

            <div className="bg-white rounded-3xl overflow-hidden shadow-md">
              <div className="relative">
                <img
                  src={
                    booking.listing.image?.url ||
                    "https://placehold.co/1200x600?text=TravEase"
                  }
                  alt={booking.listing.title}
                  className="w-full h-80 object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <span className="absolute top-5 right-5 bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {booking.bookingStatus}
                </span>

                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl font-bold">
                    {booking.listing.title}
                  </h1>

                  <p className="flex items-center gap-2 mt-2 text-sm opacity-95">
                    <FaMapMarkerAlt />
                    {booking.listing.address}, {booking.listing.city},{" "}
                    {booking.listing.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Property Description */}

            <div className="bg-white rounded-3xl shadow-md p-7">
              <h2 className="text-xl font-semibold mb-4">About this Stay</h2>

              <p className="text-gray-600 leading-8">
                {booking.listing.description}
              </p>
            </div>

            {/* Review */}

            <div className="bg-white rounded-3xl shadow-md p-7">
              <h2 className="text-xl font-semibold mb-5">Leave a Review</h2>

              <ReviewSection
                bookingId={booking._id}
                listingId={booking.listing._id}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-6 sticky top-24 h-fit">
            {/* Booking */}

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Booking Details</h2>

              <Info
                icon={<FaCheckCircle />}
                title="Booking ID"
                value={booking.bookingId}
              />

              <Info
                icon={<FaCalendarAlt />}
                title="Check In"
                value={new Date(booking.checkIn).toLocaleDateString()}
              />

              <Info
                icon={<FaCalendarAlt />}
                title="Check Out"
                value={new Date(booking.checkOut).toLocaleDateString()}
              />

              <Info icon={<FaUsers />} title="Guests" value={booking.guests} />

              <Info
                icon={<FaMoneyBillWave />}
                title="Payment"
                value={booking.paymentStatus}
              />

              <div className="mt-6 rounded-2xl bg-[var(--primary)] text-white p-5">
                <p className="text-sm opacity-90">Total Amount</p>

                <h1 className="text-3xl font-bold mt-1">
                  ₹ {booking.totalAmount}
                </h1>
              </div>
            </div>

            {/* Contact */}

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Host Details</h2>

              <Info
                icon={<FaUser />}
                title="Contact Person"
                value={booking.contactPerson?.name}
              />

              <Info
                icon={<FaPhone />}
                title="Phone"
                value={booking.contactPerson?.phone}
              />

              <hr className="my-5" />

              <Info
                icon={<FaUser />}
                title="Owner"
                value={booking.owner?.fullName}
              />

              <Info
                icon={<FaEnvelope />}
                title="Email"
                value={booking.owner?.email}
              />

              <Info
                icon={<FaPhone />}
                title="Owner Phone"
                value={booking.owner?.phone}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-10 h-10 rounded-xl bg-red-50 text-[var(--primary)] flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {title}
        </p>

        <p className="font-medium text-[15px] text-[var(--text-primary)]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default BookingDetails;
