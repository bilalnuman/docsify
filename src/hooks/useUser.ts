import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

export function useUpdateProfile() {
    return useMutation<any, Error, FormData>({
        mutationFn: (data: FormData) =>
            api.put<any>("/auth/update/", data).then((res) => res.data,)
    });
}
export function useDeleteAccount() {
    return useMutation<Error>({
        mutationFn: (data) =>
            api.post<any>("/auth/delete-account/", data).then((res) => res.data),
    });
}

export function useProfile(enabled: boolean = true) {
    return useQuery<any>({
        queryKey: ["profile", enabled],
        queryFn: () => api.get<any>("/auth/me/").then((res) => res.data),
        enabled,
        retry: 0,
        refetchOnWindowFocus: false,
        // staleTime: 10_000,
    });
}
