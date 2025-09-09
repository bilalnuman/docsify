
<<<<<<< HEAD
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
=======
import { useMutation, useQuery } from "@tanstack/react-query";
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
import api from "../api/api";

export function useMembers() {
    return useQuery({
        queryKey: ["members"],
        queryFn: () => api.get("/v1/invitations/").then((res) => res.data),
    });
}

export function useChangeRole() {
<<<<<<< HEAD
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ role, id }: { role: string, id: number }) =>
            api.post(`/v1/users/${id}/change_role/`, { role: role }).then((res) => res.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["members"],
            });
        },
=======
    return useMutation({
        mutationFn: ({ role, id }: { role: string, id: number }) =>
            api.post(`/v1/users/${id}/change_role/`, { role: role }).then((res) => res.data),
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
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
<<<<<<< HEAD

export function useDeleteMember() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) =>
            api.delete(`/v1/invitations/${id}/`).then((res) => res.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["members"],
            });
        },
    });
}


=======
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
