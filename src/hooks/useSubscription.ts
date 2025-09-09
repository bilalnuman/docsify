import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";
export function usePayment() {
    return useMutation({
        mutationFn: async (formData: any) => {
            const res = await api.post("/v1/subscriptions/upgrade/", formData);
            return res.data;
        },
    });
}

export function useGetPlans(type: string = "monthly") {
    return useQuery<any>({
        queryKey: ["useGetPlans", type],
        queryFn: () => api.get<any>(`/v1/subscription-plans/?plan_type=${type}`).then((res) => res.data),
    });
}
