import { FaHeart } from "react-icons/fa";

function FavoriteButton() {
  return (
    <button
      className="
      w-10
      h-10

      rounded-full

      bg-white/90

      backdrop-blur-md

      flex

      justify-center

      items-center

      shadow-md

      transition

      hover:scale-110
      "
    >
      <FaHeart className="text-white drop-shadow-md" />
    </button>
  );
}

export default FavoriteButton;
