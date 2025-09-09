import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdOutlineFileUpload, MdOutlineFileDownload } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { CgLoadbarSound } from "react-icons/cg";
import { LuUsers } from "react-icons/lu";
import Icon from "@/components/Icon";
import clsx from "clsx";
import Spinner from "@/components/Spinner";
import { Link } from "react-router-dom";
import { useStats } from "@/hooks/useDashboard";
import { statsIconColors } from "@/util/app-json-data";
import { useAppContext } from "@/context/AppContext";

const DashboardComponent = () => {
  const { user } = useAppContext();
  const { data: statsData, isLoading } = useStats()
  const role = user?.profile?.role.toLowerCase();


  const actions = [
    { label: "Create Training", icon: <MdOutlineFileUpload className="dark:text-white" size={24} />, href: "/training" },
    { label: "Topic Meeting", icon: <Icon name="training" className="dark:text-white" size="24" />, href: "/safety-meetings" },
    { label: "Browse Resources", icon: <IoSearchOutline className="dark:text-white" size={24} />, href: "/resources" }
  ];

  const recent_activity = statsData?.data?.recent_activity ?? []

  const viewer = [
    {
      icon: <MdOutlineFileDownload size={24} className="text-[#EF620F]" />,
      label: "Downloads",
      key: "downloads",
      valueKey: "display"
    },
    {
      icon: <AiOutlineSafetyCertificate size={24} />,
      label: "Compliance",
      key: "compliance",
      valueKey: "status",
      color: "text-[#21C35D]"
    }
  ]

  const baseStats = [
    {
      icon: <Icon name="training" className="text-[#1556D4]" />,
      label: "Training Usage",
      key: "training_usage",
      valueKey: "display"
    },
    {
      icon: <LuUsers size={24} className="text-[#21C35D]" />,
      label: "Safety Meetings",
      key: "safety_meetings",
      valueKey: "display"
    },
  ];
  const stats = (role === 'viewer' ? viewer : [...baseStats, ...viewer]).map(stat => ({
    ...stat,
    value: statsData?.data?.[stat.key]?.[stat.valueKey] ?? "—"
  }));


  return (
    <div className="space-y-6 py-4">
      {/* Stats */}
      <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4", role === "viewer" ? "lg:grid-cols-2" : "lg:grid-cols-4")}>
        {

          isLoading ?
            <div className="col-span-12"><Spinner /></div> :
            stats?.map((stat: any, idx: number) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl flex items-center gap-3 shadow-sm border border-transparent dark:border-white/10"
              >
                <div className={clsx("text-blue-600 w-11 h-11 rounded-lg bg-[#1556D41A] flex items-center justify-center", statsIconColors?.[idx])}>
                  {stat?.icon}
                </div>
                <div>
                  <p className="text-base text-[#1D253080] dark:text-[#FFFFFF80]">{stat?.label}</p>
                  <p className={`text-2xl font-semibold ${stat?.color || "text-[#1D2530] dark:text-white"}`}>
                    {stat?.value}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Quick Actions */}
      {role == "viewer" &&
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
        </div>}

      <div className="bg-white dark:bg-[#2C2D34] rounded-xl p-4 shadow-sm border border-transparent dark:border-white/10">
        <h3 className="text-[#1D2530] dark:text-white font-medium mb-3 text-xl">Recent Activity</h3>
        <div className="flex flex-col gap-2">
          {
            !recent_activity?.length ? <div className="py-4 text-center dark:text-white text-[#1D2530] text-sm font-semibold">Recent Activity Not Available</div> :

              recent_activity.map((activity: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between 
                         bg-[#1556D40D] dark:bg-[#1A1B20] rounded-xl gap-3 border border-transparent dark:border-white/10"
                >
                  <div className="flex sm:items-center sm:gap-3">
                    <div className="sm:min-w-11 sm:h-11 min-w-8 h-8 rounded-full bg-[#1556D41A] dark:bg-blue-900/40 flex items-center justify-center">
                      <Icon name="training" className="text-[#1556D4] sm:text-base text-xs" />
                    </div>
                    <div className="sm:ps-0 ps-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <p     className="min-w-0 break-words whitespace-normal font-medium text-dark-default dark:text-white text-sm sm:text-base">
                          {activity?.description}
                        </p>
                        <p className="text-sm text-dark-default dark:text-gray-300 flex sm:items-center sm:gap-2 capitalize sm:flex-row flex-col">
                          <span className="flex items-center gap-2">
                            <span className="flex text-lg">•</span>
                            {activity?.user_name}
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="flex text-lg">•</span> {activity?.user_role}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm text-gray-400 dark:text-[#FFFFFF80]">{activity?.file}</p>
                    </div>
                  </div>
                  <span className="text-xs text-dark-default dark:text-gray-200 rounded-full 
                               border border-[#1D253026] dark:border-white/10 px-2 py-1 w-fit ms-auto">
                    {activity?.time_ago}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;