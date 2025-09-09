<<<<<<< HEAD
import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import type { AuthResponse, LoginPayload } from "../types";
import type { LoginFormValue } from "@/features/auth/schemas/authSchema";
=======
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import type { AuthResponse, LoginPayload, User } from "../types";
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

export function useRegistration() {
    return useMutation<Error>({
        mutationFn: (data: any) =>
            api.post<any>("/v1/auth/signup/", data).then((res) => res.data),
    });
}
export function useLogin() {
<<<<<<< HEAD
    return useMutation<AuthResponse, Error, LoginFormValue>({
=======
    return useMutation<AuthResponse, Error, LoginPayload>({
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
        mutationFn: (data) =>
            api.post<AuthResponse>("/auth/signin/", data).then((res) => res.data),
    });
}

export function useForgotPassword() {
<<<<<<< HEAD
    return useMutation({
        mutationFn: (data: any) =>
            api.post("/auth/forgot-password/", data).then((res) => res.data),
=======
    return useMutation<AuthResponse, Error, LoginPayload>({
        mutationFn: (data) =>
            api.post<AuthResponse>("/v1/auth/forgot-password/", data).then((res) => res.data),
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    });
}

export function useResetPassword() {
<<<<<<< HEAD
    return useMutation({
        mutationFn: ({ password, token }: { password: string, token: string }) => api.post(`/auth/password-reset-confirm/${token}/`, { password }).then((res) => res.data),
    });
}




=======
    return useMutation<AuthResponse, Error, LoginPayload>({
        mutationFn: (data) =>
            api.post<AuthResponse>("/v1/auth/password-reset-confirm/", data).then((res) => res.data),
    });
}

>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
