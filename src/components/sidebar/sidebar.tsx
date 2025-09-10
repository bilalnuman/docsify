import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Icon from "@/components/Icon";
import SidebarComponent from "./index";
import { TbUsers } from "react-icons/tb";
import { useAppContext } from "@/context/AppContext";

type SidebarKey =
  | "overview"
  | "training"
  | "safetyMeetings"
  | "resources"
  | "teamMembers"
  | "help"
  | "subscription";

type MenuItemUI = {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
};

type MenuItemDef = {
  key: string;
  labelKey: SidebarKey;
  icon: React.ReactNode;
  path: string;
};

const BASE_MENU: MenuItemDef[] = [
  { key: "dashboard",       labelKey: "overview",        icon: <Icon name="overview" size="24" />,       path: "/dashboard" },
  { key: "training",        labelKey: "training",        icon: <Icon name="training" size="24" />,       path: "/training" },
  { key: "safety-meetings", labelKey: "safetyMeetings",  icon: <Icon name="safetyMeetings" size="24" />, path: "/safety-meetings" },
  { key: "resources",       labelKey: "resources",       icon: <Icon name="search" size="24" />,         path: "/resources" },
  { key: "team-members",    labelKey: "teamMembers",     icon: <TbUsers size={24} />,                    path: "/team-members" },
  { key: "/help",           labelKey: "help",            icon: <Icon name="help" size="24" />,           path: "/help" },
  { key: "subscription",    labelKey: "subscription",    icon: <Icon name="subscription" size="24" />,   path: "/subscription" },
];

const hiddenForNonAdmin = new Set(["subscription", "team-members"]);
const hiddenForViewer   = new Set(["team-members"]);

export default function Sidebar() {
  const { t: tSidebar, i18n } = useTranslation(undefined, { keyPrefix: "sidebar" });
  const { user } = useAppContext();
  const role = user?.profile?.role?.toLowerCase();

  const menu: MenuItemUI[] = useMemo(() => {
    let items = BASE_MENU;
    if (role !== "admin") items = items.filter(i => !hiddenForNonAdmin.has(i.key));
    if (role === "viewer") items = items.filter(i => !hiddenForViewer.has(i.key));

    return items.map(({ labelKey, ...rest }) => ({
      ...rest,
      label: tSidebar(labelKey),
    }));
  }, [role, i18n.language, tSidebar]);

  return <SidebarComponent menuItems={menu} sticky />;
}
