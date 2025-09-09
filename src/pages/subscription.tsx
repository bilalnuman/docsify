import { type ReactNode } from "react";
import { CiClock2 } from "react-icons/ci";
import { MdArrowCircleUp } from "react-icons/md";
import Icon from "@/components/Icon";
import { FiUsers } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import StripeModal from "@/components/modal/StripeModal";
import { Elements } from "@stripe/react-stripe-js";
import Pricing from "@/components/Pricing";
import { useStats } from "@/hooks/useDashboard";
import Spinner from "@/components/Spinner";

const ProgressBar = ({
    label,
    current,
    total,
    color = "bg-[#2563eb]",
    icon,
}: {
    label: string;
    current: number;
    total: number;
    color?: string;
    icon: ReactNode;
}) => {
    const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between text-sm text-[#1D2530] dark:text-gray-100">
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-medium">{label}</span>
                </div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-[#1A1B20] overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[#1D253080] dark:text-gray-400 text-sm">
                {current}/{total}
            </span>
        </div>
    );
};


export default function SubscriptionPage() {
    const { data: statsData, isLoading } = useStats()
    console.log(statsData)

    return (
        <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B1F] dark:bg-transparent pt-3 text-[#1D2530] dark:text-gray-100">
            <div className="mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#1D2530] dark:text-white">
                        Subscription
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your plan</p>
                </div>
                <section className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#2C2D34] p-6 shadow-sm">
                    <div>
                        <h2 className="text-xl font-medium text-[#1D2530] dark:text-white">Current Plan</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Your active subscription</p>
                    </div>
                    <div className="pt-4">
                        <div className="text-2xl font-bold text-[#1D2530] dark:text-white">$0</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">7 days remaining</div>
                    </div>
                    {isLoading ? <div className="flex justify-center">
                        <Spinner />
                    </div> :

                        <div className="mt-6 grid gap-4 md:grid-cols-4">
                            <ProgressBar
                                label="Training"
                                current={1}
                                total={2}
                                icon={<Icon name="training" size="16" className="text-blue-default" />}
                            />
                            <ProgressBar
                                label="Safety Meetings"
                                current={0}
                                total={2}
                                icon={<FiUsers className="text-[#21C25D]" size={16} />}
                            />
                            <ProgressBar
                                label="Downloads"
                                current={2}
                                total={3}
                                icon={<MdOutlineFileDownload className="text-[#EF620F]" size={20} />}
                            />
                            <ProgressBar
                                label="Members"
                                current={1}
                                total={1}
                                icon={<FiUsers className="text-blue-default" size={16} />}
                            />
                        </div>
                    }


                    <div className="mt-6 flex sm:flex-row flex-col-reverse gap-3 items-center justify-between rounded-xl border border-amber-200 dark:border-amber-400/30 bg-[#EF620F0D] dark:bg-[#FFFFFF0D] p-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <div className="flex items-center gap-2 pb-1">
                                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-white">
                                        <CiClock2 size={24} className="text-[#EF620F]" />
                                    </span>
                                    <p className="text-sm font-medium text-[#1D2530] dark:text-white">
                                        Trial Ending Soon
                                    </p>
                                </div>
                                <p className="text-sm text-[#1D253080] dark:text-gray-400">
                                    Your free trial expires in 3 days. Upgrade now to continue using all features.
                                </p>
                            </div>
                        </div>
                        <a href="#Pricing" className="ml-4 flex items-center gap-2 ms-auto shrink-0 rounded-xl bg-[#EF620F] px-4 h-[52px] text-sm font-medium text-white hover:bg-[#EF620F]/90">
                            <MdArrowCircleUp size={24} />
                            Upgrade Now
                        </a>
                    </div>
                </section>


               <section id="Pricing"> <Pricing /></section>
                <section className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#2C2D34] p-6 shadow-sm">
                    <h3 className="text-base font-semibold flex items-center gap-2 text-[#1D2530] dark:text-white">
                        <Icon name="subscription" size="24" />
                        Billing History
                    </h3>
                    <div className="mt-6 flex flex-col items-center justify-center rounded-xl p-10 text-center text-[#1D253080] dark:text-[#FFFFFF80]">
                        <Icon name="subscription" size="24" className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        <p className="mt-3 text-sm font-medium ">No billing history yet</p>
                        <p className="text-sm">Upgrade to a paid plan to see your billing history</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
