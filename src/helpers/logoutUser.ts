import { deleteCookie } from "@/util/cookies";

export const clearCookiesAndStorage = () => {
    deleteCookie("access_token");
    localStorage.clear();
    sessionStorage.clear();
}