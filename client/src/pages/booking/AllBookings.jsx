import Loader from "../../components/ui/Loader";
import OwnerBookingCard from "../../components/booking/OwnerBookingCard";
import useAllBookings from "../../hooks/useAllBookings";

function AllBookings() {
  const { bookings, loading } = useAllBookings();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-theme min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold text-primary">All Bookings</h1>

        {bookings.length === 0 ? (
          <div className="py-20 text-center text-secondary">
            No bookings received yet.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {bookings.map((booking) => (
              <OwnerBookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AllBookings;
