import { FaHeart, FaRegHeart } from "react-icons/fa";

import useWishlist from "../../hooks/useWishlist";

function WishlistButton({ listingId }) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  const wishlisted = isWishlisted(listingId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(listingId);
      }}
      className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:scale-110 transition"
    >
      {wishlisted ? (
        <FaHeart className="text-red-500 text-lg" />
      ) : (
        <FaRegHeart className="text-gray-700 text-lg" />
      )}
    </button>
  );
}

export default WishlistButton;
