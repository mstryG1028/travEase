import { Link } from "react-router-dom";

import Loader from "../../components/ui/Loader";
import BookingCard from "../../components/booking/BookingCard";
import Button from "../../components/ui/Button";

import useBookings from "../../hooks/useBookings";

function MyBookings() {
  const { bookings, loading, loadBookings } = useBookings();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-theme min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">My Bookings</h1>

            <p className="text-secondary mt-1">
              {bookings.length} Booking{bookings.length !== 1 && "s"}
            </p>
          </div>

          <Button variant="outline" onClick={loadBookings}>
            Refresh
          </Button>
        </div>

        {/* Empty */}

        {bookings.length === 0 ? (
          <div className="card-theme text-center py-20">
            <h2 className="text-2xl font-semibold text-theme">
              No Bookings Yet
            </h2>

            <p className="text-muted mt-3">
              Book your first stay and it will appear here.
            </p>

            <Link to="/" className="btn-primary inline-block mt-6">
              Explore Listings
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onUpdated={loadBookings}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyBookings;
