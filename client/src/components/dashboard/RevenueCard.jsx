function RevenueCard({ revenue }) {
  return (
    <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-3xl p-8 text-white">
      <p className="text-lg opacity-80">Total Revenue</p>

      <h2 className="text-5xl font-bold mt-4">₹ {revenue.toLocaleString()}</h2>
    </div>
  );
}

export default RevenueCard;
