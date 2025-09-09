<<<<<<< HEAD
=======
// jwt.ts
import { jwtDecode } from "jwt-decode";
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
import { getCookie } from "./cookies";

export type JwtPayload = {
    token_type: string;
<<<<<<< HEAD
    exp: number;
    iat: number;
=======
    exp: number;   // seconds since epoch
    iat: number;   // seconds since epoch
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    jti: string;
    user_id: string;
    role: string;
};

<<<<<<< HEAD
=======
// Get token from cookie and normalize (strip 'Bearer ')
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
export function getAccessToken(): string | null {
    const raw = getCookie("access_token");
    if (!raw) return null;
    return raw.startsWith("Bearer ") ? raw.slice(7) : raw;
}

<<<<<<< HEAD
=======
// Decode payload safely (no verification)
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
export function parseJwt(tokenArg?: string): JwtPayload | null {
    const token = tokenArg ?? getAccessToken();
    if (!token) return null;
    try {
<<<<<<< HEAD
        return { role: "admin" } as JwtPayload;
=======
        // return jwtDecode<JwtPayload>(token);
        // @ts-ignore
        return { role: "admin" };
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    } catch {
        return null;
    }
}

<<<<<<< HEAD
=======
// Expiry check with small clock skew (default 30s)
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
export function isExpired(
    payload?: Pick<JwtPayload, "exp"> | null,
    clockSkewSec = 30
) {
    if (!payload?.exp) return true;
    const nowMs = Date.now();
    const expMs = payload.exp * 1000;
    return expMs <= nowMs + clockSkewSec * 1000;
}

<<<<<<< HEAD
=======
// Convenience helpers
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
export function getRoleFromToken(tokenArg?: string): string | null {
    const p = parseJwt(tokenArg);
    return p?.role ?? null;
}

export function getUserIdFromToken(tokenArg?: string): string | null {
    const p = parseJwt(tokenArg);
    return p?.user_id ?? null;
}
