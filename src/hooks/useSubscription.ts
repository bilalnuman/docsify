import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";

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
    });
}
