import { useEffect, useState } from "react";
import Loader from "../../components/ui/Loader";

import WishlistCard from "../../components/favorite/WishlistCard";

import { getWishlist } from "../../services/favorite.service";

function Wishlist() {
  const [favorites, setFavorites] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    try {
      const response = await getWishlist();

      setFavorites(response.data.data || []);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

      {favorites.length === 0 ? (
        <h2>No Favorites Yet</h2>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((favorite) => (
            <WishlistCard key={favorite._id} favorite={favorite} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;
