function Select({ label, options = [], error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium text-theme">{label}</label>}

      <select {...props} className={`select-theme ${className}`}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="text-sm text-[var(--danger)]">{error}</span>}
    </div>
  );
}

export default Select;
