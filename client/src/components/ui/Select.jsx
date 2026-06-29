function Select({
  label,

  options = [],

  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label>{label}</label>}

      <select
        {...props}
        className="border border-[var(--border)] rounded-xl p-3"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
