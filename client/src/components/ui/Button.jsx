function Button({
  children,

  type = "button",

  variant = "primary",

  size = "md",

  fullWidth = false,

  disabled = false,

  loading = false,

  onClick,
}) {
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]",

    secondary: "bg-[var(--secondary)] text-white",

    outline:
      "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",

    danger: "bg-[var(--danger)] text-white",

    ghost: "hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",

    md: "px-5 py-3",

    lg: "px-7 py-4 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
                rounded-xl
                transition-all
                duration-300
                font-medium
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? "w-full" : ""}
            `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;
