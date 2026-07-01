import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <h2 className="font-bold text-xl mb-5">Quick Actions</h2>

      <div className="space-y-4">
        <Link
          to="/listings/create"
          className="btn-primary w-full block text-center"
        >
          Add Listing
        </Link>

        <Link
          to="/owner/listings"
          className="btn-secondary w-full block text-center"
        >
          My Listings
        </Link>

        <Link to="/bookings" className="btn-secondary w-full block text-center">
          View Bookings
        </Link>
      </div>
    </div>
  );
}

export default QuickActions;
