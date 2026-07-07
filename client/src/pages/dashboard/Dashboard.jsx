import Loader from "../../components/ui/Loader";

import RevenueCard from "../../components/dashboard/RevenueCard";
import StatCard from "../../components/dashboard/StateCard";
import MyListingCard from "../../components/dashboard/MyListingCard";
import RecentBookings from "../../components/dashboard/RecentBookings";
import RecentReviews from "../../components/dashboard/RecentReviews";
import QuickActions from "../../components/dashboard/QuickActions";

import useDashboard from "../../hooks/useDashboard";

function Dashboard() {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="max-w-full mx-auto py-10 px-6 bg-[var(--background)] text-[var(--text-primary)]">
      {/* Revenue */}
      <div className="mb-8">
        <RevenueCard revenue={dashboard.totalRevenue} />
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        <StatCard
          title="Bookings"
          value={dashboard.totalBookings || 0}
          color="text-blue-600"
        />

        <StatCard
          title="Confirmed"
          value={dashboard.confirmed || 0}
          color="text-sky-600"
        />

        <StatCard
          title="Active"
          value={dashboard.active || 0}
          color="text-green-600"
        />

        <StatCard
          title="Completed"
          value={dashboard.completed || 0}
          color="text-emerald-600"
        />

        <StatCard
          title="Cancelled"
          value={dashboard.cancelled || 0}
          color="text-red-500"
        />

        <MyListingCard total={dashboard.totalListings || 0} />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-8">
          <RecentBookings bookings={dashboard.recentBookings || []} />

          <RecentReviews reviews={dashboard.recentReviews || []} />
        </div>

        {/* Right Side */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
