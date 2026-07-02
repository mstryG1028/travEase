import { useEffect, useState } from "react";

import Hero from "../../components/home/Hero";
import CategorySection from "../../components/home/CategorySection";

import ListingCard from "../../components/listing/ListingCard";

import Loader from "../../components/ui/Loader";

import * as listingService from "../../services/listing.service";

function Home() {
  const [loading, setLoading] = useState(true);

  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      const res = await listingService.getAllListings();

      setListings(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <CategorySection />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Explore stays</h2>
        <div
          className="grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-8
"
        >
          
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
