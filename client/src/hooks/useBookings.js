import { useEffect, useState } from "react";
import { getMyBookings } from "../services/booking.service";

function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const res = await getMyBookings();
      setBookings(res.data.data || []);
    } catch (err) {
      console.error(err);
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

export default useBookings;
