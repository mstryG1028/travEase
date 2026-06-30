import Loader from "../../components/ui/Loader";

import StatCard from "../../components/dashboard/StatCard";

import useDashboard from "../../hooks/useDashboard";

function Dashboard() {
  const { dashboard, loading } = useDashboard();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="max-w-7xl mx-auto py-10 px-6">
      <RevenueCard revenue={dashboard.revenue} />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard
          title="Bookings"
          value={dashboard.totalBookings}
          color="text-blue-600"
        />

        <StatCard
          title="Pending"
          value={dashboard.pending}
          color="text-yellow-500"
        />

        <StatCard
          title="Completed"
          value={dashboard.completed}
          color="text-green-600"
        />

        <MyListingsCard total={dashboard.totalListings || 0} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <div className="lg:col-span-2">
          <RecentBookings bookings={dashboard.recentBookings || []} />

          <div className="mt-8">
            <RecentReviews reviews={dashboard.recentReviews || []} />
          </div>
        </div>

        <QuickActions />
      </div>
    </section>
  );
}

export default Dashboard;
