import React, { forwardRef } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  as?: "button" | "a";
  href?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      className,
      children,
      as = "button",
      href,
      type = "button",
      ...rest
    } = props;

    const isDisabled = disabled || loading;

    const base =
      "inline-flex min-h-9 items-center justify-center gap-2 border rounded-xl px-4 py-2 " +
      "cursor-pointer select-none no-underline leading-none " +
      "transition-[background,box-shadow,transform] duration-300 ease-out " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 text-sm";

    const sizes: Record<Size, string> = {
      sm: "text-sm px-3 py-1.5 rounded-md",
      md: "text-base px-4 py-2 rounded-lg",
      lg: "text-lg px-5 py-3 rounded-[10px]",
    };

    const variants: Record<Variant, string> = {
      primary:
        "bg-blue-700 text-white border-blue-700 hover:bg-blue-800 active:translate-y-px shadow-sm",
      secondary:
        "bg-blue-50 text-slate-800 border-blue-50 hover:bg-blue-100",
      ghost:
        "bg-transparent text-slate-800 border-transparent hover:bg-slate-800/5",
      outline:
        "bg-transparent text-slate-800 dark:text-white dark:border-white hover:bg-white/10 border-[#1556D4] hover:bg-slate-800/5",
      danger:
        "bg-red-600 text-white border-red-600 hover:bg-red-700 font-medium text-sm hover:!text-white active:translate-y-px",
    };

    const disabledClasses = isDisabled
      ? "opacity-60 cursor-not-allowed pointer-events-none"
      : undefined;

    const rootClass = clsx(
      base,
      sizes[size],
      variants[variant],
      fullWidth && "w-full",
      disabledClasses,
      className
    );

    const labelClass = "inline-block";
    const iconLeftClass = "inline-flex items-center mr-1.5";
    const iconRightClass = "inline-flex items-center ml-1.5";

    const spinnerClass = clsx(
      "inline-block mr-2 w-4 h-4 rounded-full border-2 animate-spin",
      variant === "primary" || variant === "danger"
        ? "border-white/20 border-t-white/90"
        : "border-slate-400/30 border-t-slate-600"
    );

    const commonProps = {
      className: rootClass,
      "aria-disabled": isDisabled || undefined,
      ref,
      ...rest,
    } as any;

    if (as === "a") {
      return (
        <Link
          {...commonProps}
          to={href}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            if (typeof (rest as any).onClick === "function") {
              (rest as any).onClick(e);
            }
          }}
        >
          {loading ? <span className={spinnerClass} aria-hidden="true" /> : null}
          {iconLeft && !loading ? (
            <span className={iconLeftClass}>{iconLeft}</span>
          ) : null}
          <span className={labelClass}>{children}</span>
          {iconRight && !loading ? (
            <span className={iconRightClass}>{iconRight}</span>
          ) : null}
        </Link>
      );
    }

    return (
      <button
        {...commonProps}
        type={type}
        disabled={isDisabled || loading}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            return;
          }
          if (typeof (rest as any).onClick === "function") {
            (rest as any).onClick(e);
          }
        }}
      >
        {loading ? <span className={spinnerClass} aria-hidden="true" /> : null}
        {iconLeft && !loading ? (
          <span className={iconLeftClass}>{iconLeft}</span>
        ) : null}
        <span className={labelClass}>{children}</span>
        {iconRight && !loading ? (
          <span className={iconRightClass}>{iconRight}</span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
