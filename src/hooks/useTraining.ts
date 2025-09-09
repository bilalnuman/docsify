import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
export function useCreateTrainingGenerations() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) =>
            api.post<any>("/v1/training-generations/", data).then((res) => res.data),

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["training-generations"],
            });
        },
    });
}

export function useUpdateTrainingGeneration() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number, data: FormData }) =>
            api.patch<any>(`/v1/training-generations/${id}/`, data).then((res) => res.data),

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["training-generations"],
            });
        },
    });
}
export function useTrainingGenerations(queryString: string, pageSize = 20) {
    return useQuery<any>({
        queryKey: ["training-generations", queryString,pageSize],
        queryFn: () => api.get<any>(`/v1/training-generations?${queryString}&page_size=${pageSize}/`).then((res) => res.data),
    });
}
export function useTrainingFolderFiles(id: number,) {
    return useQuery<any>({
        queryKey: ["training-folders", id],
        queryFn: () => api.get<any>(`/v1/training-generations/${id}/`).then((res) => res.data),
    });
}
