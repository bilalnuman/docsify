import { useQuery } from "@tanstack/react-query";
import api from "../api/api";


export function useResources() {
    return useQuery<any>({
        queryKey: ["resources"],
        queryFn: () => api.get<any>("/v1/resources/").then((res) => res.data),
    });
}
export function usevFolders() {
    return useQuery<any>({
        queryKey: ["folders"],
        queryFn: () => api.get<any>("/v1/folders/").then((res) => res.data),
    });
}
export function useFolder(id: number) {
    return useQuery({
        queryKey: ["folder", id],
        queryFn: () => api.get(`/v1/folders/${id}`).then((res) => res.data),
        enabled: !!id, // only run if id is provided
    });
}
