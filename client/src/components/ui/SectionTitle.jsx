function SectionTitle({
  title,

  description,
}) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold">{title}</h2>

      <p className="text-gray-500">{description}</p>
    </div>
  );
}

export default SectionTitle;
