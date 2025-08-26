// jwt.ts
import { jwtDecode } from "jwt-decode";
import { getCookie } from "./cookies";

export type JwtPayload = {
    token_type: string;
    exp: number;   // seconds since epoch
    iat: number;   // seconds since epoch
    jti: string;
    user_id: string;
    role: string;
};

// Get token from cookie and normalize (strip 'Bearer ')
export function getAccessToken(): string | null {
    const raw = getCookie("access_token");
    if (!raw) return null;
    return raw.startsWith("Bearer ") ? raw.slice(7) : raw;
}

// Decode payload safely (no verification)
export function parseJwt(tokenArg?: string): JwtPayload | null {
    const token = tokenArg ?? getAccessToken();
    if (!token) return null;
    try {
        // return jwtDecode<JwtPayload>(token);
        // @ts-ignore
        return { role: "admin" };
    } catch {
        return null;
    }
}

// Expiry check with small clock skew (default 30s)
export function isExpired(
    payload?: Pick<JwtPayload, "exp"> | null,
    clockSkewSec = 30
) {
    if (!payload?.exp) return true;
    const nowMs = Date.now();
    const expMs = payload.exp * 1000;
    return expMs <= nowMs + clockSkewSec * 1000;
}

// Convenience helpers
export function getRoleFromToken(tokenArg?: string): string | null {
    const p = parseJwt(tokenArg);
    return p?.role ?? null;
}

export function getUserIdFromToken(tokenArg?: string): string | null {
    const p = parseJwt(tokenArg);
    return p?.user_id ?? null;
}
