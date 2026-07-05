function StateCard({ title, value, color = "text-theme" }) {
  return (
    <div className="dashboard-card">
      <p className="text-muted">{title}</p>

      <h2 className={`mt-3 text-3xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}

export default StateCard;
