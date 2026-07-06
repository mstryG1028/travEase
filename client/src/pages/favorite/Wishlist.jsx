import { Link } from "react-router-dom";

import useWishlist from "../../hooks/useWishlist";
import Loader from "../../components/ui/Loader";
import ListingCard from "../../components/listing/ListingCard";
import EmptyState from "../../components/ui/EmptyState";

function Wishlist() {
  const { wishlist, toggleWishlist, loading } = useWishlist();

  if (loading) {
    return <Loader />;
  }

  if (!wishlist.length) {
    return (
      <EmptyState
        title="Wishlist is empty"
        description="Save your favourite stays here."
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {wishlist.map(({ listing }) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
