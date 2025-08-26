import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
export function useStats() {
    return useQuery({
        queryKey: ["stats"],
        queryFn: () => api.get("/v1/dashboard/stats/").then((res) => res.data),
    });
}
