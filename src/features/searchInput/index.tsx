"use client";
import React, {
    useCallback,
    forwardRef,
    useImperativeHandle,
    useRef,
    useEffect,
} from "react";
import { debounce } from "../../util/debounce";
import clsx from "clsx";
import { useParams } from "react-router-dom";

interface Props {
    onChange?: (value: string) => void;
    onClick?: (value: string) => void;
    handleClear?: () => void;
    placeholder?: string;
    className?: string;
    inputClass?: string;
    disabled?: boolean;
    disabledClass?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    isIconInside?: boolean;
    iconClassName?: string;
    keyName?: string;
    isIcon?: boolean;
    delay?: number;
}

export type SearchInputRef = {
    focus: () => void;
    clear: () => void;
    getValue: () => string;
};

const SearchInput = forwardRef<SearchInputRef, Props>(
    (
        {
            onClick,
            onChange,
            handleClear,
            icon,
            iconPosition = "left",
            isIconInside = true,
            placeholder = "Search...",
            className = "",
            disabled = false,
            isIcon = true,
            disabledClass = "",
            iconClassName = "",
            keyName = "search",
            delay = 500,
            inputClass = "",
        },
        ref
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const router=useParams()

        const resetSearch = useCallback(() => {
            const params = new URLSearchParams(window.location.search);
            params.delete(keyName);
            const q = params.toString();
            const next = q
                ? `${window.location.pathname}?${q}`
                : window.location.pathname;
            window.history.replaceState(null, "", next);
            if (inputRef.current) inputRef.current.value = "";
            handleClear?.();
        }, [handleClear, keyName]);

        const debouncedSearch = useCallback(
            debounce((value: string) => {
                if (!onChange) return;
                const trimmed = value.trim();
                onChange(trimmed);
                if (!trimmed.length) resetSearch();
            }, delay),
            [onChange, delay, resetSearch]
        );

        useImperativeHandle(ref, () => ({
            focus: () => inputRef.current?.focus(),
            clear: () => {
                if (inputRef.current) {
                    inputRef.current.value = "";
                    handleClear?.();
                }
            },
            getValue: () => inputRef.current?.value || "",
        }));

        const handleClick = useCallback(() => {
            const current = inputRef.current?.value?.trim() ?? "";
            const params = new URLSearchParams(window.location.search);
            const existing = params.get(keyName ?? "search") ?? "";
            if (onClick && current !== existing) onClick(current);
            if (!current) resetSearch();
        }, [onClick, resetSearch, keyName]);

        useEffect(() => {
            const params = new URLSearchParams(window.location.search);
            const searchValue = params.get(keyName ?? "search");
            if (searchValue !== null) {
                inputRef.current!.value = searchValue;
            }
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Enter" && inputRef.current) {
                    event.preventDefault();
                    handleClick();
                }
                if (event.key === "Escape") {
                    resetSearch();
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }, [handleClick, resetSearch, keyName,router]);

        return (
            <div
                className={clsx(
                    "flex mt-2 relative gap-1.5 items-center",
                    className
                )}
            >
                <input
                    ref={inputRef}
                    type="search"
                    disabled={disabled}
                    onChange={(e) => {
                        if (onChange) debouncedSearch(e.target.value);
                    }}
                    placeholder={placeholder}
                    className={clsx(
                        "flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300",
                        "bg-white dark:bg-[#2C2D34] text-gray-900 dark:text-gray-100",
                        iconPosition === "right" ? "pl-2 pr-10" : "pl-10 pr-2",
                        disabled && disabledClass,inputClass
                    )}
                />
                {isIcon && (
                    <button
                        onClick={handleClick}
                        type="button"
                        className={clsx(
                            "absolute w-10 h-full flex items-center justify-center",
                            !isIconInside &&
                            "bg-sky-500 rounded-r border border-sky-500 hover:bg-sky-600",
                            iconPosition === "left" && "left-0",
                            iconPosition === "right" && !isIconInside
                                ? "-right-9"
                                : "right-0"
                        )}
                        style={{
                            cursor: onChange ? "pointer" : "not-allowed",
                        }}
                    >
                        {icon ?? (
                            <span
                                className={clsx(
                                    "min-w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded-full relative",
                                    iconClassName
                                )}
                            >
                                <span className="absolute w-2.5 h-0.5 bg-gray-300 dark:bg-gray-500 top-2.5 left-2.5 rotate-45 origin-top-left"></span>
                            </span>
                        )}
                    </button>
                )}
            </div>
        );
    }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
