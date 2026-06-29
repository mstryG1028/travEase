import { useEffect, useState } from "react";

import Hero from "../../components/home/Hero";
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

      setListings(response.data.data||[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Hero />

      <CategorySection />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10">Explore Listings</h2>

        {listings.length === 0 ? (
          <h2>No Listings Found</h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
