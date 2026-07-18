import { Link } from "react-router-dom";

import Loader from "../../components/ui/Loader";
import BookingCard from "../../components/booking/BookingCard";
import Button from "../../components/ui/Button";

import useBookings from "../../hooks/useBookings";

function MyBookings() {
  const { bookings = [], loading, loadBookings } = useBookings();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-theme min-h-screen">
      <div className="page-container py-8 sm:py-10">
        {/* Header */}

        <div
          className="
          flex 
          flex-col 
          sm:flex-row 
          sm:items-center 
          justify-between 
          gap-4
          mb-8
        "
        >
          <div>
            <h1
              className="
              text-2xl 
              sm:text-3xl 
              font-bold 
              text-brand
            "
            >
              My Bookings
            </h1>

            <p className="text-muted mt-1 text-sm sm:text-base">
              {bookings.length} Booking
              {bookings.length !== 1 && "s"}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={loadBookings}
            className="w-full sm:w-auto"
          >
            Refresh
          </Button>
        </div>

        {/* Empty State */}

        {bookings.length === 0 ? (
          <div
            className="
            card-theme 
            text-center 
            py-14 
            sm:py-20
            px-5
          "
          >
            <h2
              className="
              text-xl 
              sm:text-2xl 
              font-semibold 
              text-theme
            "
            >
              No Bookings Yet
            </h2>

            <p
              className="
              text-muted 
              mt-3
              max-w-md
              mx-auto
            "
            >
              Book your first stay and it will appear here.
            </p>

            <Link
              to="/"
              className="
                btn-primary 
                inline-flex 
                mt-6
              "
            >
              Explore Listings
            </Link>
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
