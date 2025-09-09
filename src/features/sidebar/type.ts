import type { ReactNode } from "react";


export interface MenuItem {
    key: string;
    label: string;
    icon?: ReactNode;
    path?: string;
    onClick?: () => void;
    subMenu?: { label: string; path?: string; onClick?: () => void }[];
}

export interface SidebarProps {
    menuItems: MenuItem[];
    logo?: string | ReactNode;
    sticky?: boolean;
    customClass?: string;
}





// Reusable primitives
type ISODateString = string;
type EmailString = string;

// If you want a single shape for both success/failure, use this:
export type ApiResponse<T> =
    | { success: true; type: "success"; message: string; data: T }
    | { success: false; type: "error" | string; message: string; data?: unknown };

// ---- Dashboard stats (success) ----

export interface DashboardStatsResponse {
    success: true;
    type: "success";
    message: string;
    data: DashboardStatsData;
}

export interface DashboardStatsData {
    organization: OrganizationStats;
    subscription: SubscriptionInfo;
    usage: Record<string, unknown>;         // empty object in sample, keep flexible
    personal_usage: PersonalUsage;
    recent_activity: Activity[];
}

export interface OrganizationStats {
    total_users: number;
    active_users: number;
}

export type SubscriptionStatus = "trial" | "active" | "canceled" | "expired";

export interface SubscriptionInfo {
    plan_name: string;
    status: SubscriptionStatus;             // "trial" in sample
    is_trial: boolean;
    expires_at: ISODateString;
}

export interface PersonalUsage {
    training: number;
}

// ---- Activity feed ----

export type ActivityAction = "user_role_changed" | string;
export type RoleSlug = "viewer" | "editor" | "admin" | string;

export interface Activity {
    id: number;
    user: number;                            // 2 in sample
    user_email: EmailString;
    organization: number | null;             // null in sample
    action: ActivityAction;                  // "user_role_changed"
    description: string;
    ip_address: string;
    user_agent: string;
    metadata: ActivityMetadata;
    created_at: ISODateString;
}

export interface ActivityMetadata {
    user_id: string;                         // "5", "6" in sample
    new_role: RoleSlug;                      // "editor" | "viewer" | "admin"
    old_role: RoleSlug;
    [k: string]: unknown;                    // allow backend to add fields later
}
