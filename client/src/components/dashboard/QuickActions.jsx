import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <div className="dashboard-card">
      <h2 className="mb-5 text-xl font-bold text-theme">Quick Actions</h2>

      <div className="space-y-4">
        <Link
          to="/create-listing"
          className="btn-primary w-full block text-center py-3"
        >
          Add Listing
        </Link>

        <Link
          to="/my-listings"
          className="btn-outline w-full block text-center py-3"
        >
          My Listings
        </Link>

        <Link
          to="/bookings"
          className="btn-outline w-full block text-center py-3"
        >
          View Bookings
        </Link>
      </div>
    </div>
  );
}

export default QuickActions;
