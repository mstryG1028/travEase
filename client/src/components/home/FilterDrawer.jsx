import { useEffect, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

function FilterDrawer({ open, onClose, applyFilters, initialFilters = {} }) {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (!open) return;

    setLocation(initialFilters.location || "");
    setCategory(initialFilters.category || "");
    setMinPrice(initialFilters.minPrice || "");
    setMaxPrice(initialFilters.maxPrice || "");
    setSort(initialFilters.sort || "");
  }, [open, initialFilters]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const handleReset = () => {
    setLocation("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
  };

  const handleApply = () => {
    applyFilters({
      location,
      category,
      minPrice,
      maxPrice,
      sort,
    });

    onClose();
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed inset-0
          bg-black/40
          backdrop-blur-sm
          transition-all
          duration-300
          z-50
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-full
          sm:w-[430px]
          bg-surface
          border-l
          border-theme
          shadow-theme
          flex
          flex-col
          z-[60]
          transition-transform
          duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-theme">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FaFilter className="text-primary" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-theme">Filters</h2>

              <p className="text-sm text-secondary">Refine your search</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-full
              border
              border-theme
              flex
              items-center
              justify-center
              hover-surface
              transition-theme
            "
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
          {/* Location */}

          <div>
            <label className="block mb-2 font-medium text-theme">
              Location
            </label>

            <input
              type="text"
              placeholder="Mumbai"
              className="input-theme"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Property */}

          <div>
            <label className="block mb-2 font-medium text-theme">
              Property Type
            </label>

            <select
              className="input-theme"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Properties</option>
              <option value="Hotel">Hotel</option>
              <option value="Villa">Villa</option>
              <option value="Resort">Resort</option>
              <option value="Apartment">Apartment</option>
              <option value="Hostel">Hostel</option>
              <option value="Homestay">Homestay</option>
              <option value="Cottage">Cottage</option>
            </select>
          </div>

          {/* Price */}

          <div>
            <label className="block mb-3 font-medium text-theme">
              Price Range
            </label>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Minimum"
                className="input-theme"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <input
                type="number"
                placeholder="Maximum"
                className="input-theme"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Sort */}

          <div>
            <label className="block mb-2 font-medium text-theme">Sort By</label>

            <select
              className="input-theme"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Newest</option>

              <option value="priceAsc">Price : Low → High</option>

              <option value="priceDesc">Price : High → Low</option>
            </select>
          </div>
        </div>

        {/* Footer */}

        <div className="border-t border-theme p-6 bg-surface">
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="
                flex-1
                py-3
                rounded-xl
                border
                border-theme
                text-theme
                hover-surface
                transition-theme
                font-medium
              "
            >
              Reset
            </button>

            <button
              onClick={handleApply}
              className="
                flex-1
                py-3
                rounded-xl
                bg-primary
                text-white
                hover:opacity-90
                transition
                font-semibold
              "
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default FilterDrawer;
