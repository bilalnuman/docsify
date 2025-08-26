import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";

export function useCreateTrainingGenerations() {
    return useMutation<Error>({
        mutationFn: (data:any) =>
            api.post<any>("/v1/training-generations/", data).then((res) => res.data),
    });
}

export function useTrainingGenerations() {
    return useQuery<any>({
        queryKey: ["training-generations"],
        queryFn: () => api.get<any>("/v1/training-generations/").then((res) => res.data),
    });
}
