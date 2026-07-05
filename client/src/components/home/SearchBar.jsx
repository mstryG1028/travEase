import { IoSearch } from "react-icons/io5";

function SearchBar() {
  return (
    <div
      className="
        bg-surface
        rounded-full
        shadow-theme
        border
        border-theme
        flex
        items-center
        overflow-hidden
        max-w-4xl
        mx-auto
        transition-theme
      "
    >
      <input
        type="text"
        placeholder="Search destinations..."
        className="
          flex-1
          px-6
          py-5
          bg-transparent
          text-primary
          placeholder:text-light
          outline-none
        "
      />

      <button
        className="
          bg-primary
          text-white
          px-8
          py-5
          flex
          items-center
          gap-2
          transition-theme
          hover:opacity-90
        "
      >
        <IoSearch />
        Search
      </button>
    </div>
  );
}

export default SearchBar;
