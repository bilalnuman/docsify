<<<<<<< HEAD
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";


export function useResources(queryString?: string, pageSize = 20) {
    return useQuery<any>({
        queryKey: ["resources", queryString, pageSize],
        queryFn: () => api.get<any>(`/v1/resources/?${queryString}&page_size=${pageSize}/`).then((res) => res.data),
    });
}
export function useFolders(queryString?: string, pageSize = 20) {
    return useQuery<any>({
        queryKey: ["folders", queryString, pageSize],
        queryFn: () => api.get<any>(`/v1/folders/?${queryString}&page_size=${pageSize}/`).then((res) => res.data),
    });
}
export function useFolderById(id: number, queryString?: string, pageSize = 20) {
    return useQuery({
        queryKey: ["folder", id, queryString, pageSize],
        queryFn: () => api.get<any>(`/v1/folders/${id}/?${queryString}&page_size=${pageSize}/`).then((res) => res.data),
        enabled: !!id,
    });
}
export function useResourceDownload() {
    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.post(`/v1/resources/${id}/download/`);
            return res.data;
        },
    });
}
=======
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
        enabled: !!id,
    });
}
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
