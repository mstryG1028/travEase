function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-3xl shadow p-6 ${className}`}>
      {children}
    </div>
  );
}
export default Card;
