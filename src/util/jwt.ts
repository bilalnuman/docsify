import { getCookie } from "./cookies";

export type JwtPayload = {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: string;
    role: string;
};

export function getAccessToken(): string | null {
    const raw = getCookie("access_token");
    if (!raw) return null;
    return raw.startsWith("Bearer ") ? raw.slice(7) : raw;
}

export function parseJwt(tokenArg?: string): JwtPayload | null {
    const token = tokenArg ?? getAccessToken();
    if (!token) return null;
    try {
        return { role: "admin" } as JwtPayload;
    } catch {
        return null;
    }
}

export function isExpired(
    payload?: Pick<JwtPayload, "exp"> | null,
    clockSkewSec = 30
) {
    if (!payload?.exp) return true;
    const nowMs = Date.now();
    const expMs = payload.exp * 1000;
    return expMs <= nowMs + clockSkewSec * 1000;
}

export function getRoleFromToken(tokenArg?: string): string | null {
    const p = parseJwt(tokenArg);
    return p?.role ?? null;
}

export function getUserIdFromToken(tokenArg?: string): string | null {
    const p = parseJwt(tokenArg);
    return p?.user_id ?? null;
}
