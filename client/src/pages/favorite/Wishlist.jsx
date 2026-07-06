import Loader from "../../components/ui/Loader";
import WishlistCard from "../../components/favorite/WishlistCard";
import useFavorites from "../../hooks/useFavorites";

function Wishlist() {
  const { favorites, loading, removeFromUI } = useFavorites();

  if (loading) return <Loader />;

  return (
    <section className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

      {favorites.length === 0 ? (
        <p>No favorite listings.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((item) => (
            <WishlistCard key={item._id} item={item} onRemove={removeFromUI} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Wishlist;
