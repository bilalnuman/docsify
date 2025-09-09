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
type ISODateString = string;
type EmailString = string;
export type ApiResponse<T> =
    | { success: true; type: "success"; message: string; data: T }
    | { success: false; type: "error" | string; message: string; data?: unknown };

export interface DashboardStatsResponse {
    success: true;
    type: "success";
    message: string;
    data: DashboardStatsData;
}

export interface DashboardStatsData {
    organization: OrganizationStats;
    subscription: SubscriptionInfo;
    usage: Record<string, unknown>; 
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
    status: SubscriptionStatus;
    is_trial: boolean;
    expires_at: ISODateString;
}

export interface PersonalUsage {
    training: number;
}

export type ActivityAction = "user_role_changed" | string;
export type RoleSlug = "viewer" | "editor" | "admin" | string;

export interface Activity {
    id: number;
    user: number; 
    user_email: EmailString;
    organization: number | null; 
    action: ActivityAction;  
    description: string;
    ip_address: string;
    user_agent: string;
    metadata: ActivityMetadata;
    created_at: ISODateString;
}

export interface ActivityMetadata {
    user_id: string; 
    new_role: RoleSlug; 
    old_role: RoleSlug;
    [k: string]: unknown;
}
