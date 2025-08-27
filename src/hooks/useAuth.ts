import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import type { AuthResponse, LoginPayload, User } from "../types";

export function useRegistration() {
    return useMutation<Error>({
        mutationFn: (data: any) =>
            api.post<any>("/v1/auth/signup/", data).then((res) => res.data),
    });
}
export function useLogin() {
    return useMutation<AuthResponse, Error, LoginPayload>({
        mutationFn: (data) =>
            api.post<AuthResponse>("/auth/signin/", data).then((res) => res.data),
    });
}

export function useForgotPassword() {
    return useMutation<AuthResponse, Error, LoginPayload>({
        mutationFn: (data) =>
            api.post<AuthResponse>("/v1/auth/forgot-password/", data).then((res) => res.data),
    });
}

export function useResetPassword() {
    return useMutation<AuthResponse, Error, LoginPayload>({
        mutationFn: (data) =>
            api.post<AuthResponse>("/v1/auth/password-reset-confirm/", data).then((res) => res.data),
    });
}

