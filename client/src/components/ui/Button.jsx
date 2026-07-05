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
    primary: "bg-primary text-white hover:opacity-90",

    secondary: "bg-[var(--secondary)] text-white hover:opacity-90",

    outline:
      "border border-primary text-brand hover:bg-primary hover:text-white",

    danger: "bg-[var(--danger)] text-white hover:opacity-90",

    ghost: "bg-transparent text-theme hover-surface",
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
        font-medium
        transition-theme
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;
