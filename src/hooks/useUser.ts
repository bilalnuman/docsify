import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";

export function useLogin() {
    return useMutation<Error>({
        mutationFn: (data) =>
            api.post<any>("/api/auth/signin/", data).then((res) => res.data),
    });
}

export function useProfile() {
    return useQuery<any>({
        queryKey: ["profile"],
        queryFn: () => api.get<any>("/api/auth/me/").then((res) => res.data),
    });
}
