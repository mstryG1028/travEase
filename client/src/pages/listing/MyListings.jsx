import Loader from "../../components/ui/Loader";
import ListingCard from "../../components/listing/ListingCard";
import * as listingService from "../../services/listing.service";
import { useEffect } from "react";
import useMyListings from "../../hooks/useMyListings";

function MyListings() {
  const { listings, loading, setListings } = useMyListings();

  if (loading) return <Loader />;

  return (
    <section className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">My Listings</h1>

      {listings.length === 0 ? (
        <p>No Listings Found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              isOwner
              onDelete={(id) =>
                setListings((prev) => prev.filter((item) => item._id !== id))
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MyListings;
