import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";
export function useCreateSupport() {
    return useMutation({
        mutationFn: async (formData:any) => {
            const res = await api.post("/v1/requests/create/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        },
    });
}

export function useSupport() {
    return useQuery<any>({
        queryKey: ["requests"],
        queryFn: () => api.get<any>("/api/requests/").then((res) => res.data),
    });
}
