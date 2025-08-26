
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";

export function useMembers() {
    return useQuery({
        queryKey: ["members"],
        queryFn: () => api.get("/api/v1/invitations/").then((res) => res.data),
    });
}

export function useChangeRole() {
    return useMutation({
        mutationFn: ({ role, id }: { role: string, id: number }) =>
            api.post(`/v1/users/${id}/change_role/`, { role: role }).then((res) => res.data),
    });
}
export function useInviteMember() {
    return useMutation({
        mutationFn: (payload: any) =>
            api.post(`/v1/invitations/`, payload).then((res) => res.data),
    });
}
export function useAcceptInvitation() {
    return useMutation({
        mutationFn: (payload: any) =>
            api.post(`/v1/invitations/accept/`, payload).then((res) => res.data),
    });
}
export function useResendInvitation() {
    return useMutation({
        mutationFn: ({ payload, id }: { payload: any, id: number }) =>
            api.post(`/v1/invitations/${id}/resend/`, payload).then((res) => res.data),
    });
}
