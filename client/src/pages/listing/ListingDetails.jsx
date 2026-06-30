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
    <section className="max-w-7xl mx-auto px-6 py-10">
      <img
        src={listing.image?.url}
        alt={listing.title}
        className="w-full h-[500px] rounded-3xl object-cover"
      />

      <div className="mt-8 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold">{listing.title}</h1>

          <p className="flex items-center gap-2 mt-4 text-gray-500">
            <FaMapMarkerAlt />
            {listing.address},{listing.city},{listing.state}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500" />

          {listing.averageRating.toFixed(1)}
        </div>
      </div>

      <hr className="my-8" />

      <h2 className="text-3xl font-semibold">Description</h2>

      <p className="mt-4 text-gray-600">{listing.description}</p>

      <hr className="my-8" />

      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold">Guests</h3>

          <p>{listing.guests}</p>
        </div>

        <div>
          <h3 className="font-semibold">Bedrooms</h3>

          <p>{listing.bedrooms}</p>
        </div>

        <div>
          <h3 className="font-semibold">Beds</h3>

          <p>{listing.beds}</p>
        </div>

        <div>
          <h3 className="font-semibold">Bathrooms</h3>

          <p>{listing.bathrooms}</p>
        </div>
      </div>

      <hr className="my-8" />

      <h2 className="text-3xl font-semibold">Amenities</h2>

      <div className="flex flex-wrap gap-3 mt-6">
        {listing.amenities.map((item) => (
          <span key={item} className="px-4 py-2 rounded-full bg-gray-100">
            {item}
          </span>
        ))}
      </div>

      <hr className="my-8" />

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold">₹{listing.currentPrice}</h2>

          <p>per night</p>
        </div>

        <BookingForm listing={listing} />
        <ReviewSection listingId={listing._id} bookingId={null} />
      </div>
    </section>
  );
}

export default ListingDetails;
