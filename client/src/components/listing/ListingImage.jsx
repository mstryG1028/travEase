function ListingImage({ image, listingId }) {
  return (
    <div
      className="
        relative
        h-72
        overflow-hidden
        rounded-3xl
        bg-surface-2
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
          transition-transform
          duration-500
          group-hover:scale-105
        "
      />
    </div>
  );
}

export default ListingImage;
