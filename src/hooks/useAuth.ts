import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import type { AuthResponse, LoginPayload } from "../types";
import type { LoginFormValue } from "@/features/auth/schemas/authSchema";

export function useRegistration() {
    return useMutation<Error>({
        mutationFn: (data: any) =>
            api.post<any>("/v1/auth/signup/", data).then((res) => res.data),
    });
}
export function useLogin() {
    return useMutation<AuthResponse, Error, LoginFormValue>({
        mutationFn: (data) =>
            api.post<AuthResponse>("/auth/signin/", data).then((res) => res.data),
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (data: any) =>
            api.post("/auth/forgot-password/", data).then((res) => res.data),
    });
}

export function useResetPassword() {
    return useMutation({
        mutationFn: ({ password, token }: { password: string, token: string }) => api.post(`/auth/password-reset-confirm/${token}/`, { password }).then((res) => res.data),
    });
}




