import { useEffect, useState } from "react";

import CategorySection from "../../components/home/CategorySection";
import ListingCard from "../../components/listing/ListingCard";
import Loader from "../../components/ui/Loader";

import * as listingService from "../../services/listing.service";

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      const response = await listingService.getAllListings();
      setListings(response.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto  py-1">
        <CategorySection />

        <section className="mt-16">
          {listings.length === 0 ? (
            <h2>No Listings Found</h2>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
