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
    <section className="bg-surface w-full border-b border-theme sticky top-19 z-40 transition-theme">
      <div className="flex overflow-x-auto scrollbar-hide px-2 md:px-6">
        <div className="flex w-full min-w-max md:min-w-0">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className="
                  group
                  flex-1
                  min-w-[90px]
                  h-20
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  border-b-2
                  border-transparent
                  transition-theme
                  hover:border-primary
                  hover:text-brand
                "
              >
                <Icon
                  size={20}
                  className="
                    text-secondary
                    transition-theme
                    group-hover:text-brand
                    group-hover:scale-110
                  "
                />

                <span
                  className="
                    text-xs
                    font-medium
                    text-secondary
                    whitespace-nowrap
                    transition-theme
                    group-hover:text-brand
                  "
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
