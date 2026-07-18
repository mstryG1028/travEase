import Loader from "../../components/ui/Loader";
import OwnerBookingCard from "../../components/booking/OwnerBookingCard";
import useAllBookings from "../../hooks/useAllBookings";

function AllBookings() {
  const { bookings = [], loading } = useAllBookings();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-theme min-h-screen">
      <div className="page-container py-8 sm:py-10">
        {/* Header */}

        <div className="mb-8">
          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-brand
            "
          >
            All Bookings
          </h1>

          <p className="text-muted mt-2">
            Manage bookings received for your listings.
          </p>
        </div>

        {/* Empty State */}

        {bookings.length === 0 ? (
          <div
            className="
              card-theme
              py-16
              sm:py-20
              text-center
              px-5
            "
          >
            <h2 className="text-xl font-semibold text-theme">
              No bookings yet
            </h2>

            <p className="text-muted mt-2">
              When guests book your properties, they will appear here.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-6
              sm:gap-8
            "
          >
            {bookings
              .filter((booking) => booking?.listing)
              .map((booking) => (
                <OwnerBookingCard key={booking._id} booking={booking} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AllBookings;
