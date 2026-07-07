import { useEffect, useState } from "react";
import { getMyBookings } from "../services/booking.service";

function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const res = await getMyBookings();

      setBookings(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return {
    bookings,
    setBookings,
    loading,
    loadBookings,
  };
}

export default useBookings;
