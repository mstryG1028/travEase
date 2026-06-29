function Textarea({
  label,

  error,

  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label>{label}</label>}

      <textarea
        {...props}
        rows={5}
        className="border border-[var(--border)] rounded-xl p-3 outline-none focus:border-[var(--primary)]"
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default Textarea;
