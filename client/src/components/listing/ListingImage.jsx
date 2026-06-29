import FavoriteButton from "./FavoriteButton";

function ListingImage({
  image,

  favorite,
}) {
  return (
    <div
      className="
relative
overflow-hidden
rounded-t-3xl
h-64
"
    >
      <img
        src={image}
        alt="listing"
        className="
h-full
w-full
object-cover
hover:scale-110
duration-500
"
      />

      <FavoriteButton isFavorite={favorite} />
    </div>
  );
}

export default ListingImage;
