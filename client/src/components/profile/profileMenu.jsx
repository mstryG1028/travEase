import { User, Heart, Calendar, Home, Star, Lock } from "lucide-react";
import { Link } from "react-router-dom";

function ProfileMenu() {
  const menus = [
    {
      icon: User,
      text: "Edit Profile",
      link: "/profile/edit",
    },
    {
      icon: Calendar,
      text: "My Bookings",
      link: "/bookings",
    },
    {
      icon: Heart,
      text: "Wishlist",
      link: "/wishlist",
    },
    {
      icon: Home,
      text: "My Listings",
      link: "/owner/listings",
    },
    {
      icon: Star,
      text: "My Reviews",
      link: "/reviews/me",
    },
    {
      icon: Lock,
      text: "Change Password",
      link: "/profile/password",
    },
  ];

  return (
    <div
      className="
        bg-surface
        rounded-3xl
        shadow-theme
        border
        border-theme
        p-6
        transition-theme
      "
    >
      {menus.map((item, index) => (
        <Link
          key={item.text}
          to={item.link}
          className={`
            flex
            items-center
            gap-4
            py-4
            text-primary
            hover:text-brand
            transition-theme
            ${index !== menus.length - 1 ? "border-b border-theme" : ""}
          `}
        >
          <item.icon size={20} />

          <span>{item.text}</span>
        </Link>
      ))}
    </div>
  );
}

export default ProfileMenu;
