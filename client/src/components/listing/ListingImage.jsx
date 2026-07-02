import FavoriteButton from "../favorite/FavoriteButton";

function ListingImage({ image, listingId }) {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      h-72
      "
    >
      <img
        src={
          image ||
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900"
        }
        alt=""
        className="
        w-full
        h-full
        object-cover

        transition-all
        duration-500

        group-hover:scale-105
        "
      />

      <div
        className="
        absolute
        top-4
        right-4
        "
      >
        <FavoriteButton listingId={listingId} initialFavorite={false} />
      </div>
    </div>
  );
}

export default ListingImage;
