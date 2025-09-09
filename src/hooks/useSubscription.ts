import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";
<<<<<<< HEAD
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
=======

export function useSubscriptionsUpgrade() {
    return useMutation<Error>({
        mutationFn: (data) =>
            api.post<any>("/subscriptions/upgrade/", data).then((res) => res.data),
    });
}

export function useSubscriptionPlans() {
    return useQuery<any>({
        queryKey: ["subscription-plans"],
        queryFn: () => api.get<any>("/v1/subscription-plans/").then((res) => res.data),
    });
}
export function useSubscriptions() {
    return useQuery<any>({
        queryKey: ["subscriptions"],
        queryFn: () => api.get<any>("/v1/subscriptions/").then((res) => res.data),
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    });
}
