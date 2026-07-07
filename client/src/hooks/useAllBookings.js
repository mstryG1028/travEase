import { useEffect, useState } from "react";
import { getOwnerBookings } from "../services/booking.service";

function useAllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const res = await getOwnerBookings();

      setBookings(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    bookings,
    loading,
    loadBookings,
  };
}

export default useAllBookings;
