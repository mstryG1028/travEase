import {
  FaUmbrellaBeach,
  FaMountain,
  FaHotel,
  FaCampground,
  FaHome,
  FaWater,
  FaSnowflake,
} from "react-icons/fa";

const categories = [
  {
    title: "Beach",
    icon: <FaUmbrellaBeach />,
  },

  {
    title: "Mountain",
    icon: <FaMountain />,
  },

  {
    title: "Hotel",
    icon: <FaHotel />,
  },

  {
    title: "Villa",
    icon: <FaHome />,
  },

  {
    title: "Camping",
    icon: <FaCampground />,
  },

  {
    title: "Lake",
    icon: <FaWater />,
  },

  {
    title: "Snow",
    icon: <FaSnowflake />,
  },
];

function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold">Explore By Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mt-10">
        {categories.map((category) => (
          <div
            key={category.title}
            className="
bg-white
rounded-2xl
shadow
hover:shadow-xl
duration-300
cursor-pointer
p-8
flex
flex-col
items-center
gap-4
hover:-translate-y-2
"
          >
            <div className="text-5xl text-[var(--primary)]">
              {category.icon}
            </div>

            <h3 className="font-semibold">{category.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
