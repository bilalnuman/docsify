import Icon from "@/components/Icon";
import SidebarComponent from "./index";
import { TbUsers } from "react-icons/tb";
import { useAppContext } from "@/context/AppContext";

type MenuItem = {
    key: string;
    label: string;
    icon: React.ReactNode;
    path: string;
};

export default function Sidebar() {
    const { user } = useAppContext();
    const role = user?.profile?.role.toLowerCase();

    const baseMenu: MenuItem[] = [
        { key: "dashboard", label: "Overview", icon: <Icon name="overview" size="24" />, path: "/dashboard" },
        { key: "training", label: "Training", icon: <Icon name="training" size="24" />, path: "/training" },
        { key: "safety-meetings", label: "Safety Meetings", icon: <Icon name="safetyMeetings" size="24" />, path: "/safety-meetings" },
        { key: "resources", label: "Resources", icon: <Icon name="search" size="24" />, path: "/resources" },
        { key: "team-members", label: "Team Members", icon: <TbUsers size={24} />, path: "/team-members" },
        { key: "/help", label: "Help", icon: <Icon name="help" size="24" />, path: "/help" },
        { key: "subscription", label: "Subscription", icon: <Icon name="subscription" size="24" />, path: "/subscription" },
    ];
    const hiddenForNonAdmin = new Set(["subscription","team-members"]);
    const hiddenForViewer = new Set(["team-members"]);

    let menu = baseMenu;
    if (role !== "admin") {
        menu = menu.filter(item => !hiddenForNonAdmin.has(item.key));
    }

    if (role === "viewer") {
        menu = menu.filter(item => !hiddenForViewer.has(item.key));
    }

    return <SidebarComponent menuItems={menu} sticky />;
}
