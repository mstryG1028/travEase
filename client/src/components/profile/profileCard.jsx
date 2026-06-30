function ProfileCard({ profile }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow
        p-8
      "
    >
      <img
        src={profile.avatar?.url}
        alt=""
        className="
        w-32
        h-32
        rounded-full
        object-cover
        mx-auto
      "
      />

      <h2
        className="
        text-2xl
        font-bold
        text-center
        mt-5
      "
      >
        {profile.fullName}
      </h2>

      <p
        className="
        text-center
        text-gray-500
      "
      >
        {profile.email}
      </p>

      <button
        className="
        w-full
        mt-6
        bg-[var(--primary)]
        text-white
        rounded-xl
        py-3
      "
      >
        Edit Profile
      </button>
    </div>
  );
}

export default ProfileCard;
