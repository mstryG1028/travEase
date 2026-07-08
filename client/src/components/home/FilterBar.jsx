import { FiFilter } from "react-icons/fi";
import { FaArrowDownWideShort } from "react-icons/fa6";

function FilterBar({ onFilter, sort, setSort }) {
  return (
    <div className="flex items-center justify-between mt-6 mb-2">
      <button
        onClick={onFilter}
        className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          border
          border-theme
          bg-surface
          hover-surface
          transition-theme
        "
      >
        <FiFilter size={18} />
        <span>Filters</span>
      </button>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="
          input-theme
          w-52
          cursor-pointer
        "
      >
        <option value="">Newest</option>
        <option value="price-asc">Price : Low to High</option>
        <option value="price-desc">Price : High to Low</option>
      </select>
    </div>
  );
}

export default FilterBar;
