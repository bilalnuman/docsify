import React from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "./Dropdown";
import Button from "./Button";
import Icon from "./Icon";
import clsx from "clsx";

type LangCode = "en" | "es";

const LANGS: Record<LangCode, { short: "EN" | "ES"; label: string }> = {
  en: { short: "EN", label: "English" },
  es: { short: "ES", label: "Español" },
};

const LanguageToggle = ({ right = 100 }: { right?: number }) => {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "en")
    .split("-")[0] as LangCode;

  const setLang = (code: LangCode) => {
    if (code === current) return;
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
  };

  return (
    <Dropdown
      label={
        <div className="flex items-center gap-2">
          <Icon name="glob" />
          <span className="uppercase">{LANGS[current].short}</span>
        </div>
      }
      classNames={{
        container:
          "hidden sm:flex justify-center items-center cursor-pointer gap-2 h-10 w-[86px] rounded-lg border border-blue-default text-base text-blue-default dark:border-white dark:text-white",
        icon: "dark:!text-white",
        menu:
          "dark:!bg-[#2C2D34] dark:!border-[#2C2D34] !min-w-[150px] shadow-md",
      }}
      dropdown={{ right: right, left: "unset", top: 10 }}
    >
      <Button
        variant="ghost"
        className={clsx("text-dark-default dark:!text-white !justify-start hover:dark:!bg-dark-default", LANGS[current].short === "EN" ? "dark:!bg-dark-default !bg-gray-100" : "")}
        onClick={() => setLang("en")}
        aria-pressed={current === "en"}
        role="menuitemradio"
      >
        EN — {LANGS.en.label}
      </Button>
      <Button
        variant="ghost"
        className={clsx("hover:dark:!bg-dark-default text-dark-default dark:!text-white !justify-start", LANGS[current].short === "ES" ? "dark:!bg-dark-default !bg-gray-100" : "")}
        onClick={() => setLang("es")}
        aria-pressed={current === "es"}
        role="menuitemradio"
      >
        ES — {LANGS.es.label}
      </Button>
    </Dropdown>
  );
};

export default LanguageToggle;
