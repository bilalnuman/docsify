import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";

export function useUpdateProfile() {
    return useMutation<Error>({
        mutationFn: (data) =>
            api.post<any>("/api/auth/update/", data).then((res) => res.data),
    });
}
export function useDeleteAccount() {
    return useMutation<Error>({
        mutationFn: (data) =>
            api.post<any>("/api/auth/delete-account/", data).then((res) => res.data),
    });
}

export function useProfile() {
    return useQuery<any>({
        queryKey: ["profile"],
        queryFn: () => api.get<any>("/api/auth/me/").then((res) => res.data),
    });
}
