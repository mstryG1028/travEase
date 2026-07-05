function ProfileCard({ profile }) {
  return (
    <div
      className="
        bg-surface
        rounded-3xl
        shadow-theme
        border
        border-theme
        p-8
        transition-theme
      "
    >
      <img
        src={profile.avatar?.url}
        alt={profile.fullName}
        className="
          w-32
          h-32
          mx-auto
          rounded-full
          object-cover
          border-4
          border-theme
          bg-surface-2
        "
      />

      <h2
        className="
          text-2xl
          font-bold
          text-center
          text-primary
          mt-5
        "
      >
        {profile.fullName}
      </h2>

      <p
        className="
          text-center
          text-secondary
          mt-2
        "
      >
        {profile.email}
      </p>

      <button
        className="
          btn-primary
          w-full
          mt-6
        "
      >
        Edit Profile
      </button>
    </div>
  );
}

export default ProfileCard;
