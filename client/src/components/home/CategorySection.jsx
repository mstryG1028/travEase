import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  FaFire,
  FaHotel,
  FaHome,
  FaUmbrellaBeach,
  FaBuilding,
  FaBed,
  FaSlidersH,
} from "react-icons/fa";

import { LuHouse, LuTentTree } from "react-icons/lu";

import FilterDrawer from "./FilterDrawer";

const categories = [
  {
    name: "Trending",
    icon: FaFire,
  },
  {
    name: "Hotel",
    icon: FaHotel,
  },
  {
    name: "Villa",
    icon: FaHome,
  },
  {
    name: "Resort",
    icon: FaUmbrellaBeach,
  },
  {
    name: "Apartment",
    icon: FaBuilding,
  },
  {
    name: "Hostel",
    icon: FaBed,
  },
  {
    name: "Homestay",
    icon: LuHouse,
  },
  {
    name: "Cottage",
    icon: LuTentTree,
  },
];

function CategorySection() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedCategory = searchParams.get("category") || "Trending";

  const handleCategory = (category) => {
    const params = new URLSearchParams(searchParams);

    if (category === "Trending") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    params.delete("page");

    setSearchParams(params);
  };

  const applyFilters = ({ location, category, minPrice, maxPrice, sort }) => {
    const params = new URLSearchParams(searchParams);

    // Location
    if (location) {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    // Category
    if (category) {
      params.set("category", category);
    }

    // Min Price
    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    // Max Price
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    // Sorting
    if (sort === "priceAsc") {
      params.set("sort", "currentPrice");
      params.set("order", "asc");
    } else if (sort === "priceDesc") {
      params.set("sort", "currentPrice");
      params.set("order", "desc");
    } else {
      params.delete("sort");
      params.delete("order");
    }

    params.delete("page");

    setSearchParams(params);
  };

  const activeFilters =
    (searchParams.get("location") ? 1 : 0) +
    (searchParams.get("minPrice") ? 1 : 0) +
    (searchParams.get("maxPrice") ? 1 : 0) +
    (searchParams.get("sort") ? 1 : 0);

  return (
    <>
      <section className="sticky top-18 z-40 bg-surface border-b border-theme transition-theme">
        <div className="flex items-center justify-between gap-2 md:px-6">
          {/* Categories */}

          <div className="flex flex-1 overflow-x-auto  scrollbar-hide">
            {categories.map((item) => {
              const Icon = item.icon;

              const active = selectedCategory === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => handleCategory(item.name)}
                  className={`
                    group
                    flex-shrink-0
                    min-w-[98px]
                    h-20
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                  ml-5
                    border-b-2
                    transition-theme

                    ${
                      active
                        ? "border-primary"
                        : "border-transparent hover:border-primary"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={`
                      transition-theme

                      ${
                        active
                          ? "text-brand scale-110"
                          : "text-secondary group-hover:text-brand group-hover:scale-110"
                      }
                    `}
                  />

                  <span
                    className={`
                      text-xs
                      font-medium
                      whitespace-nowrap
                      transition-theme

                      ${
                        active
                          ? "text-brand"
                          : "text-secondary group-hover:text-brand"
                      }
                    `}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filter Button */}

          <button
            onClick={() => setDrawerOpen(true)}
            className="
              relative
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              border
              border-theme
              bg-background
              hover:bg-brand
              hover:text-white
              transition-theme
              flex-shrink-0
            "
          >
            <FaSlidersH size={15} />

            <span className="text-sm font-medium">Filters</span>

            {activeFilters > 0 && (
              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  rounded-full
                  bg-brand
                  text-white
                  text-[11px]
                  flex
                  items-center
                  justify-center
                  font-semibold
                "
              >
                {activeFilters}
              </span>
            )}
          </button>
        </div>
      </section>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        applyFilters={applyFilters}
        initialFilters={{
          location: searchParams.get("location") || "",
          category: searchParams.get("category") || "",
          minPrice: searchParams.get("minPrice") || "",
          maxPrice: searchParams.get("maxPrice") || "",
          sort:
            searchParams.get("sort") === "currentPrice"
              ? searchParams.get("order") === "asc"
                ? "priceAsc"
                : "priceDesc"
              : "",
        }}
      />
    </>
  );
}

export default CategorySection;
