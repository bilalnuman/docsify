import React, { useRef } from "react";
import clsx from "clsx";
import { LuCalendar } from "react-icons/lu";

type DateFieldProps = {
    label: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: { message?: string };
    classNames?: {
        input?: string;
        container?: string;
        label?: string;
        iconClass?: string;
    };
    placeholder?: string;
    min?: string;
    max?: string;
    required?: boolean;
    disabled?: boolean;
};

const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
    (
        {
            label,
            name,
            value,
            onChange,
            onBlur,
            error,
            classNames,
            placeholder,
            min,
            max,
            required,
            disabled,
            ...rest
        },
        ref
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);

        const openPicker = () => {
            const el = (ref as React.RefObject<HTMLInputElement>)?.current ?? inputRef.current;
            if (el?.showPicker) el.showPicker();
            else el?.focus();
        };

        return (
            <div className={clsx("mb-4 w-full", classNames?.container)}>
                <label
                    htmlFor={name}
                    className={clsx(
                        "block text-sm font-medium text-[#1D2530] dark:text-gray-100 mb-1",
                        classNames?.label
                    )}
                >
                    {label}
                </label>

                <div className="relative w-full">
                    <input
                        ref={(node) => {
                            if (typeof ref === "function") ref(node as HTMLInputElement);
                            else if (ref) ref.current = node;
                            inputRef.current = node as HTMLInputElement | null;
                        }}
                        id={name}
                        name={name}
                        type="date"
                        value={value ?? ""}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        required={required}
                        disabled={disabled}
                        className={clsx(
                            "w-full px-3 pr-10 py-2 border rounded-md focus:outline-none relative focus:ring-2",
                            "appearance-none",
                            error
                                ? "border-red-500 focus:ring-red-300"
                                : "border-gray-300 focus:ring-blue-300 dark:border-white/15",
                            "bg-white text-[#1D2530]",
                            "dark:bg-[#2C2D34] dark:text-white",
                            "date-no-native-icon",
                            classNames?.input
                        )}
                        {...rest}
                    />
                    <button
                        type="button"
                        onClick={openPicker}
                        className={clsx(
                            "absolute right-3 top-1/2 -translate-y-1/2",
                            "inline-flex items-center justify-center",
                            "text-gray-500 hover:text-gray-700",
                            "dark:text-gray-300 dark:hover:text-gray-100",
                            classNames?.iconClass
                        )}
                        aria-label="Open date picker"
                        tabIndex={-1}>
                        <LuCalendar className="text-[18px]" />
                    </button>
                </div>

                {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
            </div>
        );
    }
);

DateField.displayName = "DateField";
export default DateField;
