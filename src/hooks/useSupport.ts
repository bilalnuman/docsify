import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";

export function useCreateSupport() {
    return useMutation<Error>({
        mutationFn: (data) =>
            api.post<any>("/v1/requests/", data).then((res) => res.data),
    });
}

export function useSupport() {
    return useQuery<any>({
        queryKey: ["requests"],
        queryFn: () => api.get<any>("/api/requests/").then((res) => res.data),
    });
}
