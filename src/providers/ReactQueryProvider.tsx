import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import queryClient from "../api/queryClient";

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
