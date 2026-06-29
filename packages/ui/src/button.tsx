import React from "react";
import Link from "next/link";

export interface ButtonProps {
  variant: "primary" | "ghost" | "outline";
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  onClick,
  href,
  className = "",
  disabled = false,
}) => {
  let baseStyles =
    "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";

  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles = "bg-primary text-surface hover:bg-primary-dark";
      break;
    case "ghost":
      variantStyles = "bg-transparent border border-surface text-surface hover:bg-surface/10";
      break;
    case "outline":
      variantStyles = "border border-primary text-primary hover:bg-primary hover:text-surface";
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case "sm":
      sizeStyles = "px-4 py-2 text-sm";
      break;
    case "md":
      sizeStyles = "px-6 py-3 text-base";
      break;
    case "lg":
      sizeStyles = "px-8 py-4 text-lg";
      break;
  }

  const combinedStyles = `${baseStyles} ${variantStyles} ${sizeStyles} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedStyles}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={combinedStyles}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
// ✅ FILE COMPLETE
