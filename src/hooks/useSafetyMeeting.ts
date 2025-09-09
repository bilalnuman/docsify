import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";


export function useGetData(queryString?: string, pageSize = 20) {

    return useQuery({
        queryKey: ["use-get-data", queryString, pageSize],
        queryFn: () =>
            api
                .get(`/v1/topic-meeting-generations/?${queryString}page_size=${pageSize}/`)
                .then((res) => res.data),

    });
}
export function useCreateTopicGenerations() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) =>
            api.post<any>("/v1/topic-meeting-generations/", data).then((res) => res.data),

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["topic-meeting-generations"],
            });
        },
    });
}


export function useUpdateSafety() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: FormData }) =>
            api.patch<any>(`/v1/topic-meeting-generations/${id}/`, data).then((res) => res.data),

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["use-get-data"],
            });
        },
    });
}
export function useGetTopicGenerations() {
    return useQuery({
        queryKey: ["topic-meeting-generations"],
        queryFn: () =>
            api.get<any>("/v1/topic-meeting-generations/").then((res) => res.data),
    });
}

export function useGetFolderFiles(id: number, enabled: boolean = true) {
    return useQuery<any>({
        queryKey: ["safety-folders", id, enabled],
        enabled,
        queryFn: () => api.get<any>(`/v1/topic-meeting-generations/${id}/`).then((res) => res.data),
    });
}

export function useDeleteTopic() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) =>
            api.delete(`/v1/topic-meeting-generations/${id}/`).then((res) => res.data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["use-get-data"],
            });
        },
    });
}
