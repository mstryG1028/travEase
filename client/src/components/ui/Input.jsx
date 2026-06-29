import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium">{label}</label>}

      <input
        ref={ref}
        {...props}
        className={`
            border
            border-[var(--border)]
            rounded-xl
            p-3
            outline-none
            focus:border-[var(--primary)]
            transition-all
            ${className}
          `}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
