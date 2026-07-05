function RevenueCard({ revenue }) {
  return (
    <div className="rounded-theme p-8 text-white shadow-theme-lg bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
      <p className="text-lg opacity-80">Total Revenue</p>

      <h2 className="mt-4 text-5xl font-bold">₹ {revenue.toLocaleString()}</h2>
    </div>
  );
}

export default RevenueCard;
