import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import BookingForm from "../../components/booking/BookingForm";
import ReviewSection from "../../components/review/ReviewSection";

import * as listingService from "../../services/listing.service";
import Loader from "../../components/ui/Loader";

function ListingDetails() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListing();
  }, []);

  async function fetchListing() {
    try {
      const response = await listingService.getListingById(id);

      setListing(response.data.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  if (!listing) return <h1>Listing Not Found</h1>;

  return (
    <section className="bg-[var(--background)] min-h-screen py-10 text-[var(--text-primary)] transition-colors">
      <div className="max-w-7xl mx-auto px-5">
        {/* Hero Image */}
        <div className="overflow-hidden rounded-3xl shadow-xl">
          <img
            src={listing.image?.url}
            alt={listing.title}
            className="w-full h-[500px] object-cover hover:scale-105 duration-500"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-8">
          <div>
            <h1 className="text-4xl font-bold text-[var(--text-primary)]">
              {listing.title}
            </h1>

            <p className="flex items-center gap-2 mt-3 text-[var(--text-secondary)]">
              <FaMapMarkerAlt className="text-[var(--primary)]" />
              {listing.address}, {listing.city}, {listing.state}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[var(--card)] shadow px-5 py-3 rounded-xl mt-5 md:mt-0 border border-[var(--border)]">
            <FaStar className="text-yellow-500" />

            <span className="font-semibold text-[var(--text-primary)]">
              {listing.averageRating?.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-3 gap-10 mt-10">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-[var(--card)] rounded-2xl shadow p-6 border border-[var(--border)]">
              <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
                Description
              </h2>

              <p className="text-[var(--text-secondary)] leading-8">
                {listing.description}
              </p>
            </div>

            {/* Property Info */}
            <div className="bg-[var(--card)] rounded-2xl shadow p-6 border border-[var(--border)]">
              <h2 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">
                Property Details
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div className="border border-[var(--border)] rounded-xl p-5 text-center">
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">
                    {listing.guests}
                  </h3>
                  <p className="text-[var(--text-secondary)]">Guests</p>
                </div>

                <div className="border border-[var(--border)] rounded-xl p-5 text-center">
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">
                    {listing.bedrooms}
                  </h3>
                  <p className="text-[var(--text-secondary)]">Bedrooms</p>
                </div>

                <div className="border border-[var(--border)] rounded-xl p-5 text-center">
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">
                    {listing.beds}
                  </h3>
                  <p className="text-[var(--text-secondary)]">Beds</p>
                </div>

                <div className="border border-[var(--border)] rounded-xl p-5 text-center">
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">
                    {listing.bathrooms}
                  </h3>
                  <p className="text-[var(--text-secondary)]">Bathrooms</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-[var(--card)] rounded-2xl shadow p-6 border border-[var(--border)]">
              <h2 className="text-2xl font-bold mb-5 text-[var(--text-primary)]">
                Amenities
              </h2>

              <div className="flex flex-wrap gap-3">
                {listing.amenities.map((item) => (
                  <span
                    key={item}
                    className="bg-[var(--surface)] text-[var(--primary)] px-4 py-2 rounded-full font-medium border border-[var(--border)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="sticky top-24 bg-[var(--card)] rounded-3xl shadow-2xl border border-[var(--border)]">
              {/* Header */}
              <div className="bg-gradient-to-r from-[var(--primary)] to-[#ff6b4a] text-white p-6 rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-4xl font-bold">
                      ₹{listing.currentPrice}
                    </h2>

                    <p className="text-sm text-white/80">per night</p>
                  </div>

                  <div className="bg-white text-yellow-500 px-3 py-2 rounded-xl shadow">
                    ⭐ {listing.averageRating?.toFixed(1) || "4.8"}
                  </div>
                </div>

                {listing.basePrice > listing.currentPrice && (
                  <p className="mt-3 text-sm">
                    <span className="line-through opacity-80">
                      ₹{listing.basePrice}
                    </span>

                    <span className="ml-2 font-semibold">
                      Save ₹{listing.basePrice - listing.currentPrice}
                    </span>
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="px-6 pt-5 flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                  ✓ Free Cancellation
                </span>

                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                  ⚡ Instant Booking
                </span>

                <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
                  🔒 Secure Payment
                </span>
              </div>

              {/* Booking Form */}
              <div className="p-6">
                <BookingForm listing={listing} />
              </div>

              {/* Footer */}
              <div className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-4 text-sm text-[var(--text-secondary)]">
                <div className="flex justify-between mb-2">
                  <span>✔ No hidden charges</span>
                </div>

                <div className="flex justify-between">
                  <span>Need help?</span>

                  <button className="text-[var(--primary)] font-semibold hover:underline">
                    Contact Host
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <ReviewSection listingId={listing._id} />
        </div>
      </div>
    </section>
  );
}

export default ListingDetails;
