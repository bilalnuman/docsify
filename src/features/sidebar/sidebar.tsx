import Icon from "../../components/Icon";
import SidebarComponent from "./index";
import { TbUsers } from "react-icons/tb";
import { parseJwt } from "../../util/jwt";

type MenuItem = {
    key: string;
    label: string;
    icon: React.ReactNode;
    path: string;
};

export default function Sidebar() {
    const payload = parseJwt(); 
    const role = payload?.role ?? "";
    const isAdmin = role.toLowerCase() === "admin";

    const baseMenu: MenuItem[] = [
        {
            key: "dashboard",
            label: "Overview",
            icon: <Icon name="overview" size="24" />,
            path: "/dashboard",
        },
        {
            key: "training",
            label: "Training",
            icon: <Icon name="training" size="24" />,
            path: "/training",
        },
        {
            key: "safety-meetings",
            label: "Safety Meetings",
            icon: <Icon name="safetyMeetings" size="24" />,
            path: "/safety-meetings",
        },
        {
            key: "resources",
            label: "Resources",
            icon: <Icon name="search" size="24" />,
            path: "/resources",
        },
        {
            key: "teamMembers",
            label: "Team Members",
            icon: <TbUsers size={24} />,
            path: "/teamMembers",
        },
        {
            key: "/help",
            label: "Help",
            icon: <Icon name="help" size="24" />,
            path: "/help",
        },
        {
            key: "subscription",
            label: "Subscription",
            icon: <Icon name="subscription" size="24" />,
            path: "/subscription",
        },
    ];
    const menu = isAdmin
        ? baseMenu
        : baseMenu.filter(
            (item) => item.key !== "subscription" && item.key !== "teamMembers"
        );

    return <SidebarComponent menuItems={menu} sticky={true} />;
}
