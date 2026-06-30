import { useEffect, useState } from "react";

import { getProfile } from "../services/profile.service";

function useProfile() {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await getProfile();

      setProfile(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  return {
    profile,
    loading,
    loadProfile,
  };
}

export default useProfile;
