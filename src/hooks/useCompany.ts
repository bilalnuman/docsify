<<<<<<< HEAD
import api from "@/api/api";
import { useMutation } from "@tanstack/react-query";

export function useCompany() {
    return useMutation<Error>({
        mutationFn: (data: any) =>
            api.post<any>("/v1/organizations/", data).then((res) => res.data),
    });
}
=======
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Company, CompanyPayload } from "../types";
import api from "../api/api";

export function useCompanies() {
    return useQuery<Company[]>({
        queryKey: ["companies"],
        queryFn: () => api.get<Company[]>("/v1/organizations/").then((res) => res.data),
    });
}

export function useOnboardCompany() {
    return useMutation<Company, Error, CompanyPayload>({
        mutationFn: (data) =>
            api.post<Company>("/v1/organizations/", data).then((res) => res.data),
    });
}
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
