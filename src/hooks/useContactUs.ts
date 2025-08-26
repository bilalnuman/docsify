import { useMutation } from "@tanstack/react-query";
import api from "../api/api";

export function useLogin() {
    return useMutation<Error>({
        mutationFn: (data) =>
            api.post<any>("/v1/contact/", data).then((res) => res.data),
    });
}
