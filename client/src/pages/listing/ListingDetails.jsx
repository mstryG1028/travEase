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
    <section className="bg-gray-50 min-h-screen py-10">
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
            <h1 className="text-4xl font-bold text-gray-800">
              {listing.title}
            </h1>

            <p className="flex items-center gap-2 mt-3 text-gray-500">
              <FaMapMarkerAlt className="text-red-500" />
              {listing.address}, {listing.city}, {listing.state}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white shadow px-5 py-3 rounded-xl mt-5 md:mt-0">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">
              {listing.averageRating?.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-3 gap-10 mt-10">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Description</h2>

              <p className="text-gray-600 leading-8">{listing.description}</p>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Property Details</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div className="border rounded-xl p-5 text-center">
                  <h3 className="font-bold text-lg">{listing.guests}</h3>
                  <p className="text-gray-500">Guests</p>
                </div>

                <div className="border rounded-xl p-5 text-center">
                  <h3 className="font-bold text-lg">{listing.bedrooms}</h3>
                  <p className="text-gray-500">Bedrooms</p>
                </div>

                <div className="border rounded-xl p-5 text-center">
                  <h3 className="font-bold text-lg">{listing.beds}</h3>
                  <p className="text-gray-500">Beds</p>
                </div>

                <div className="border rounded-xl p-5 text-center">
                  <h3 className="font-bold text-lg">{listing.bathrooms}</h3>
                  <p className="text-gray-500">Bathrooms</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold mb-5">Amenities</h2>

              <div className="flex flex-wrap gap-3">
                {listing.amenities.map((item) => (
                  <span
                    key={item}
                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Reviews</h2>

              <ReviewSection listingId={listing._id} bookingId={null} />
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="sticky top-24 bg-white rounded-3xl shadow-xl border p-6">
              <div className="mb-6">
                <h2 className="text-4xl font-bold text-[var(--primary)]">
                  ₹{listing.currentPrice}
                </h2>

                <p className="text-gray-500">per night</p>
              </div>

              <BookingForm listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListingDetails;
