import {
  FaFire,
  FaBed,
  FaMountain,
  FaHotel,
  FaHome,
  FaCampground,
  FaWater,
  FaSnowflake,
  FaUmbrellaBeach,
  FaTree,
  FaLandmark,
} from "react-icons/fa";

const categories = [
  { name: "Trending", icon: FaFire },
  { name: "Rooms", icon: FaBed },
  { name: "Hotels", icon: FaHotel },
  { name: "Mountains", icon: FaMountain },
  { name: "Villas", icon: FaHome },
  { name: "Camping", icon: FaCampground },
  { name: "Lake", icon: FaWater },
  { name: "Snow", icon: FaSnowflake },
  { name: "Beach", icon: FaUmbrellaBeach },
  { name: "Tree House", icon: FaTree },
  { name: "Historical", icon: FaLandmark },
];

function CategorySection() {
  return (
    <section className="bg-white border-b border-[var(--border)]">
      <div
        className="
        max-w-7xl
        mx-auto
        flex
        items-center
        overflow-x-auto
        scrollbar-hide
        px-4
        "
      >
        {categories.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="
              group
              flex
              flex-col
              items-center
              justify-center
              shrink-0

              h-24
              w-28

              border-b-2
              border-transparent

              transition-all
              duration-300

              hover:border-black
              hover:bg-gray-50
              "
            >
              <Icon
                size={22}
                className="
                text-gray-500
                group-hover:text-black
                group-hover:-translate-y-1
                duration-300
                "
              />

              <span
                className="
                mt-2
                text-sm
                font-medium
                text-gray-500
                group-hover:text-black
                "
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategorySection;