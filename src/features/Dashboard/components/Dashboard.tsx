import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdOutlineFileUpload, MdOutlineFileDownload } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { CgLoadbarSound } from "react-icons/cg";
import { LuUsers } from "react-icons/lu";
import Icon from "../../../components/Icon";
import clsx from "clsx";
import Spinner from "../../../components/Spinner";
import type { DashboardStatsResponse } from "../../sidebar/type";
import { Link } from "react-router-dom";
import { useStats } from "../../../hooks/useDashboard";
import { formErrorToast } from "../../../util/formErrorToast";

const DashboardComponent = () => {
  const { data: statsData, isLoading, isError, error } = useStats()
  const statsIconColors = [
    "bg-[#1556D41A]",
    "bg-[#21C25D1A]",
    "bg-[#EF620F1A]",
    "bg-[#1556D41A]"
  ];
  const stats = [
    { icon: <Icon name="training" className="text-[#1556D4]" />, label: "Training Usage", value: "7/10" },
    { icon: <LuUsers size={24} className="text-[#21C35D]" />, label: "Safety Meetings", value: "4/10" },
    { icon: <MdOutlineFileDownload size={24} className="text-[#EF620F]" />, label: "Downloads", value: "23/3" },
    { icon: <AiOutlineSafetyCertificate size={24} />, label: "Compliance", value: "Active", color: "text-[#21C35D]" }
  ];

  const actions = [
    { label: "Create Training", icon: <MdOutlineFileUpload size={24} />, href: "/training" },
    { label: "Topic Meeting", icon: <Icon name="training" size="24" />, href: "/safety-meetings" },
    { label: "Browse Resources", icon: <IoSearchOutline size={24} />, href: "/resources" }
  ];

  const activities = [
    {
      title: "Training material generated",
      user: "Henry Anderson",
      role: "Editor",
      file: "Safety Protocol - Fall Protection.pdf",
      time: "2 hours ago"
    },
    {
      title: "Meeting report created",
      user: "Henry Anderson",
      role: "Viewer",
      file: "Weekly Safety Meeting - QA Review",
      time: "1 Day ago"
    }
  ];

  const apiData: DashboardStatsResponse = statsData
  const recent_activity = statsData?.data?.recent_activity ?? []


  return (
    <div className="space-y-6 py-4">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {

          isLoading ?
            <div className="col-span-12"><Spinner /></div> :
            stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl flex items-center gap-3 shadow-sm border border-transparent dark:border-white/10"
              >
                <div className={clsx("text-blue-600 w-11 h-11 rounded-lg bg-[#1556D41A] flex items-center justify-center", statsIconColors[idx])}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-base text-[#1D253080] dark:text-[#FFFFFF80]">{stat.label}</p>
                  <p className={`text-2xl font-semibold ${stat.color || "text-[#1D2530] dark:text-white"}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl shadow-sm border border-transparent dark:border-white/10">
        <h3 className="text-[#1D2530] dark:text-white font-medium mb-3 text-xl flex items-center gap-2">
          <CgLoadbarSound size={24} />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actions.map((action, idx) => (
            <Link to={action.href}
              key={idx}
              className="border border-blue-default dark:border-blue-400/60 dark:bg-[#1A1B20] rounded-lg p-4 flex flex-col items-center justify-center 
                         text-blue-default dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-[#2f3036] transition"
            >
              {action.icon}
              <span className="mt-2 text-sm font-medium dark:text-white">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#2C2D34] rounded-xl p-4 shadow-sm border border-transparent dark:border-white/10">
        <h3 className="text-[#1D2530] dark:text-white font-medium mb-3 text-xl">Recent Activity</h3>
        <div className="flex flex-col gap-2">
          {
            !recent_activity?.length ? <div className="py-4 text-center dark:text-white text-[#1D2530] text-sm font-semibold">Recent Activity Not Available</div> :

              recent_activity.map((activity, idx) => (
                <div
                  key={idx}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between 
                         bg-[#1556D40D] dark:bg-[#1A1B20] rounded-xl gap-3 border border-transparent dark:border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#1556D41A] dark:bg-blue-900/40 flex items-center justify-center">
                      <Icon name="training" className="text-[#1556D4]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-medium text-dark-default dark:text-white text-base">
                          {activity.title}
                        </p>
                        <p className="text-sm text-[#1D253080] dark:text-gray-300">
                          {activity.user} • {activity.role}
                        </p>
                      </div>
                      <p className="text-sm text-gray-400 dark:text-[#FFFFFF80]">{activity.file}</p>
                    </div>
                  </div>
                  <span className="text-xs text-dark-default dark:text-gray-200 rounded-full 
                               border border-[#1D253026] dark:border-white/10 px-2 py-1">
                    {activity.time}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;