import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CategorySection from "../../components/home/CategorySection";
import ListingCard from "../../components/listing/ListingCard";
import Loader from "../../components/ui/Loader";
import AIRecommendationModal from "../../components/ai/AIRecommendationModal";
import AIFloatingButton from "../../components/ai/AIFloatingButton";
import * as listingService from "../../services/listing.service";

function Home() {
  const [searchParams] = useSearchParams();
  const [openAI, setOpenAI] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "Trending";
  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";

  useEffect(() => {
    fetchListings();
  }, [category, keyword, location, minPrice, maxPrice, sort, order]);

  async function fetchListings() {
    try {
      setLoading(true);

      const response = await listingService.getAllListings({
        category,
        keyword,
        location,
        minPrice,
        maxPrice,
        sort,
        order,
      });

      setListings(response || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <CategorySection />

        {loading ? (
          <Loader />
        ) : (
          <section className="mt-10 pb-10">
            {listings.length === 0 ? (
              <div className="text-center py-24 text-secondary text-lg">
                No Listings Found
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {listings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
      <AIRecommendationModal open={openAI} onClose={() => setOpenAI(false)} />

      <AIFloatingButton onClick={() => setOpenAI(true)} />
    </div>
  );
}

export default Home;
