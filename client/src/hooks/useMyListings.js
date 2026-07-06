import { useEffect, useState } from "react";

import * as listingService from "../services/listing.service";

function useMyListings() {
  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      const response = await listingService.getMyListings();

      setListings(response.data.data || []);
    } finally {
      setLoading(false);
    }
  }

  return {
    listings,
    loading,
    setListings,
    refetch: fetchListings,
  };
}

export default useMyListings;
