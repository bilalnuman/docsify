import clsx from "clsx";
import type { ReactNode } from "react";
import { LuCircleCheckBig } from "react-icons/lu";

export type PlanCardProps = {
  /** Headline (e.g. "Pro", "Business") */
  title: string;

  /** Main price label already formatted (e.g. "$39") */
  priceMain: string;

  /** Small interval label rendered as "/month" or "/year" */
  intervalLabel?: string;

  /** Optional subhead line under title */
  subtitle?: string;

  /** Optional small gray line under price (e.g. “billed yearly”) */
  priceSub?: string;

  /** Feature bullets. Strings will be rendered with an icon; ReactNodes render as-is */
  features: Array<string | ReactNode>;

  /** Button label */
  ctaLabel: string;

  /** Called when CTA is clicked */
  onSelect?: () => void;

  /** Highlights card & shows badge */
  highlighted?: boolean;

  /** Custom badge content; defaults to "Recommended" when highlighted */
  badge?: ReactNode;

  /** Disabled state for CTA */
  disabled?: boolean;

  /** Extra className for outer card */
  className?: string;

  /** Custom icon for string features (defaults to LuCircleCheckBig) */
  featureIcon?: ReactNode;
};

export function PlanCard({
  title,
  priceMain,
  intervalLabel = "/month",
  subtitle,
  priceSub,
  features,
  ctaLabel,
  onSelect,
  highlighted = false,
  badge,
  disabled = false,
  className,
  featureIcon,
}: PlanCardProps) {
  const BadgeContent = badge ?? "Recommended";
  const DefaultIcon = featureIcon ?? (
    <LuCircleCheckBig className="mt-0.5 h-4 w-4 text-[#2563eb]" />
  );

  return (
    <div
      className={clsx(
        "relative rounded-xl border bg-white dark:bg-transparent shadow-sm",
        highlighted ? "border-blue-default" : "border-gray-200 dark:border-white/10 h-full",
        className
      )}
      data-highlighted={highlighted || undefined}
    >
      {highlighted && (
        <div className="absolute -top-3 start-1/2 translate-x-[-50%] rounded-full bg-[#1556D4] dark:bg-white dark:text-dark-default px-3 py-1 text-xs font-medium text-white shadow">
          {BadgeContent}
        </div>
      )}

      <div className="p-6 dark:border-white/10 bg-white dark:bg-[#2C2D34] rounded-xl">
        {/* Header */}
        <div className="mt-2 flex flex-col items-center">
          <h3 className="text-lg font-medium text-[#1D2530] dark:text-white">{title}</h3>

          <div className="flex items-end gap-1 py-1">
            <span className="text-[28px] font-extrabold text-[#1D2530] dark:text-white">
              {priceMain}
            </span>
            {intervalLabel && (
              <sub className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                {intervalLabel}
              </sub>
            )}
          </div>

          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 italic">{subtitle}</p>
          )}
          {priceSub && (
            <p className="text-xs text-gray-400 dark:text-gray-500">{priceSub}</p>
          )}
        </div>

        {/* Features */}
        <ul className="mt-4 space-y-2 text-sm text-[#1D2530] dark:text-gray-100">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              {typeof f === "string" ? (
                <>
                  {DefaultIcon}
                  <span>{f}</span>
                </>
              ) : (
                f
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          onClick={onSelect}
          disabled={disabled}
          className={clsx(
            "mt-6 w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            highlighted
              ? "bg-[#1556D4] text-white hover:bg-[#1556D4]/90"
              : "border-[#1556D4] border text-dark-default dark:text-gray-100 hover:text-white hover:bg-[#1556D4]",
            disabled && "opacity-60 cursor-not-allowed"
          )}
          aria-disabled={disabled || undefined}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

export default PlanCard;
