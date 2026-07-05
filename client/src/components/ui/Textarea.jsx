function Textarea({ label, error, className = "", rows = 5, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium text-theme">{label}</label>}

      <textarea
        rows={rows}
        {...props}
        className={`textarea-theme resize-none ${className}`}
      />

      {error && <span className="text-sm text-[var(--danger)]">{error}</span>}
    </div>
  );
}

export default Textarea;
