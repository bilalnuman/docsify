import React, {
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

type ToggleSize = "sm" | "md" | "lg";
type LabelPosition = "left" | "right";

export type SwitchButtonProps = {
  checked?: boolean;
  
  defaultChecked?: boolean;

  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  label?: React.ReactNode;
  labelPosition?: LabelPosition;
  size?: ToggleSize;
  name?: string;
  value?: string;
  id?: string;
  className?: string;
  [dataAttr: `data-${string}`]: unknown;
};

const sizeStyles: Record<
  ToggleSize,
  {
    track: string;
    thumb: string;
    translateOn: string;
    ring: string;
  }
> = {
  sm: {
    track: "h-5 w-9",
    thumb: "h-4 w-4",
    translateOn: "translate-x-4",
    ring: "ring-offset-2",
  },
  md: {
    track: "h-6 w-12",
    thumb: "h-5 w-5",
    translateOn: "translate-x-6",
    ring: "ring-offset-2",
  },
  lg: {
    track: "h-8 w-14",
    thumb: "h-7 w-7",
    translateOn: "translate-x-6",
    ring: "ring-offset-2",
  },
};

function useControllable(
  controlled: boolean | undefined,
  defaultValue: boolean | undefined
) {
  const [uncontrolled, setUncontrolled] = useState<boolean>(!!defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? !!controlled : uncontrolled;
  const setValue = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
    },
    [isControlled]
  );
  return [value, setValue, isControlled] as const;
}

const SwitchButton = forwardRef<HTMLButtonElement, SwitchButtonProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      loading = false,
      label,
      labelPosition = "right",
      size = "md",
      name,
      value = "on",
      id,
      className,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const checkboxId = id ?? `toggle-${autoId}`;
    const [on, setOn, isControlled] = useControllable(checked, defaultChecked);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const setRefs = useCallback(
      (node: HTMLButtonElement) => {
        btnRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref]
    );

    const sizeCls = sizeStyles[size];
    const isInteractive = !disabled && !loading;

    const handleToggle = useCallback(() => {
      if (!isInteractive) return;
      const next = !on;
      setOn(next);
      onChange?.(next);
    }, [isInteractive, on, onChange, setOn]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (!isInteractive) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (on) {
            setOn(false);
            onChange?.(false);
          }
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          if (!on) {
            setOn(true);
            onChange?.(true);
          }
        }
      },
      [handleToggle, isInteractive, on, onChange, setOn]
    );

    const labelNode = useMemo(
      () =>
        label ? (
          <span
            className={clsx(
              "select-none text-sm",
              disabled ? "text-slate-400" : "text-slate-200"
            )}
          >
            {label}
          </span>
        ) : null,
      [label, disabled]
    );

    return (
      <label
        htmlFor={checkboxId}
        className={clsx(
          "inline-flex items-center gap-3",
          !isInteractive && "cursor-not-allowed",
          isInteractive && "cursor-pointer",
          className
        )}
      >
        {label && labelPosition === "left" && labelNode}
        <button
          ref={setRefs}
          type="button"
          role="switch"
          aria-checked={on}
          aria-disabled={!isInteractive}
          aria-labelledby={label ? `${checkboxId}-label` : undefined}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={clsx(
            "relative inline-flex shrink-0 items-center rounded-full transition-colors",
            sizeCls.track,
            on ? "bg-[#1556D4]" : "bg-[#ECECEC] dark:bg-dark-dark-bg",
            isInteractive
              ? "focus:outline-none focus:ring-2 focus:ring-indigo-400 " + sizeCls.ring
              : "opacity-60",
            loading && "opacity-80"
          )}
          {...rest}
        >
          {loading && (
            <span
              className="absolute inset-0 grid place-items-center"
              aria-hidden="true"
            >
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
            </span>
          )}
          <span
            className={clsx(
              "pointer-events-none inline-block transform rounded-full bg-white shadow transition",
              sizeCls.thumb,
              on ? sizeCls.translateOn : "translate-x-0",
              loading && "opacity-70"
            )}
            style={{ marginLeft: "2px", marginRight: "2px" }}
          />
          <input
            id={checkboxId}
            name={name}
            value={value}
            type="checkbox"
            className="sr-only"
            checked={on}
            onChange={() => {
            }}
            readOnly
          />
        </button>

        {label && labelPosition === "right" && (
          <span id={`${checkboxId}-label`} className="select-none text-sm text-slate-200">
            {label}
          </span>
        )}
      </label>
    );
  }
);

SwitchButton.displayName = "SwitchButton";

export default React.memo(SwitchButton);
