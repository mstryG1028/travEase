import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium text-theme">{label}</label>}

      <input
        ref={ref}
        {...props}
        className={`
            w-full
            rounded-xl
            border
            border-theme
            bg-surface
            text-theme
            p-3
            outline-none
            transition-theme
             
            focus:border-primary
            ${className}
          `}
      />

      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
