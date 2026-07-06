import Loader from "../../components/ui/Loader";
import BookingCard from "../../components/booking/BookingCard";
import useBookings from "../../hooks/useBookings";

function MyBookings() {
  const { bookings, loading } = useBookings();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-theme min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-primary mb-8">My Bookings</h1>

        {/* EMPTY STATE */}
        {bookings.length === 0 ? (
          <div className="text-center text-secondary py-20">
            No Bookings Yet
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyBookings;
