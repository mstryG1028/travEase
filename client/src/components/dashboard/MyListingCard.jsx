function MyListingsCard({ total }) {
  return (
    <div className="card-theme p-6">
      <h3 className="text-muted">Total Listings</h3>

      <h2 className="mt-3 text-4xl font-bold text-theme">{total}</h2>
    </div>
  );
}

export default MyListingsCard;
