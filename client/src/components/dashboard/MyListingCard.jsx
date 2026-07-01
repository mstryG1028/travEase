function MyListingsCard({ total }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-gray-500">Total Listings</h3>

      <h2 className="text-4xl font-bold mt-3">{total}</h2>
    </div>
  );
}

export default MyListingsCard;
