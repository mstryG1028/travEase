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
      bg-white
      rounded-3xl
      shadow
      p-6
      "
    >
      {menus.map((item) => (
        <Link
          key={item.text}
          to={item.link}
          className="
            flex
            items-center
            gap-4
            py-4
            border-b
            hover:text-[var(--primary)]
            "
        >
          <item.icon />

          {item.text}
        </Link>
      ))}
    </div>
  );
}

export default ProfileMenu;
