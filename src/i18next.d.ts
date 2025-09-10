import "i18next";
import type { resources, defaultNS } from "./i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    // This mirrors the shape of one language (en/es) under the default namespace:
    resources: (typeof resources)["en"];
  }
}
