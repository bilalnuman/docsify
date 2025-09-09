import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

export function useCompany() {
    return useMutation<Error>({
        mutationFn: (data: any) =>
            api.post<any>("/v1/organizations/", data).then((res) => res.data),
    });
}