import Loader from "../../components/ui/Loader";

import ProfileCard from "../../components/profile/ProfileCard";
import ProfileMenu from "../../components/profile/ProfileMenu";

import useProfile from "../../hooks/useProfile";
import AvatarUploader from "../../components/profile/AvatarUploader";

function Profile() {
  const { profile, loading } = useProfile();

  if (loading) return <Loader />;

  return (
    <section
      className="
      max-w-7xl
      mx-auto
      py-10
      px-6
      grid
      lg:grid-cols-3
      gap-10
    "
    >
      <div className="space-y-6">
        <AvatarUploader profile={profile} reloadProfile={loadProfile} />

        <ProfileCard profile={profile} />
      </div>

      <div className="lg:col-span-2">
        <ProfileMenu />
      </div>
    </section>
  );
}

export default Profile;
