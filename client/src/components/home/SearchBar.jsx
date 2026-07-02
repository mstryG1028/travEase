import { IoSearch } from "react-icons/io5";

function SearchBar() {
  return (
    <div
      className="
      bg-white
      rounded-full
      shadow-xl
      flex
      items-center
      overflow-hidden
      max-w-4xl
      mx-auto
      "
    >
      <input
        placeholder="Search destinations..."
        className="flex-1 px-6 py-5 outline-none"
      />

      <button
        className="
        bg-rose-500
        text-white
        px-8
        py-5
        flex
        items-center
        gap-2
        hover:bg-rose-600
        "
      >
        <IoSearch />
        Search
      </button>
    </div>
  );
}

export default SearchBar;
