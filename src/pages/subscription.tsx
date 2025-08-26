import { type ReactNode } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { MdArrowCircleUp } from "react-icons/md";
import Icon from "../components/Icon";
import { FiUsers } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuCircleCheckBig } from "react-icons/lu";
import clsx from "clsx";

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
    const pct = Math.min(100, Math.round((current / total) * 100));
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

const PlanCard = ({
    title,
    priceMain,
    priceSub,
    subtitle,
    bullets,
    cta,
    highlight,
}: {
    title: string;
    priceMain: string;
    priceSub?: string;
    subtitle?: string;
    bullets: string[];
    cta: string;
    highlight?: "recommended";
}) => {
    return (
        <div
            className={clsx(
                "relative rounded-xl border bg-white dark:bg-transparent shadow-sm",
                highlight === "recommended"
                    ? "border-blue-default"
                    : "border-gray-200 dark:border-white/10"
            )}
        >
            {highlight === "recommended" && (
                <div className="absolute -top-3 start-1/2 translate-x-[-50%] rounded-full bg-[#1556D4] dark:bg-white dark:text-dark-default px-3 py-1 text-xs font-medium text-white shadow">
                    Recommended
                </div>
            )}
            <div className="p-6 dark:border-white/10 bg-white dark:bg-[#2C2D34] rounded-xl">
                <div className="mt-2 flex flex-col items-center">
                    <h3 className="text-lg font-medium text-[#1D2530] dark:text-white">
                        {title}
                    </h3>
                    <div className="flex items-end gap-1">
                        <span className="text-[28px] font-bold text-[#1D2530] dark:text-white">
                            {priceMain}
                        </span>
                        <span className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            /month
                        </span>
                    </div>
                    {subtitle && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {subtitle}
                        </p>
                    )}
                    {priceSub && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {priceSub}
                        </p>
                    )}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-[#1D2530] dark:text-gray-100">
                    {bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <LuCircleCheckBig className="mt-0.5 h-4 w-4 text-[#2563eb]" />
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>

                <button
                    className={clsx(
                        "mt-6 w-full rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#1556D4]/90",
                        highlight === "recommended"
                            ? "bg-[#1556D4] text-white"
                            : "border-[#1556D4] border text-dark-default dark:text-gray-100 hover:text-white hover:bg-[#1556D4]"
                    )}
                >
                    {cta}
                </button>
            </div>
        </div>
    );
};

export default function SubscriptionPage() {
    return (
        <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#1A1B1F] dark:bg-transparent pt-3 text-[#1D2530] dark:text-gray-100">
            <div className="mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-[#1D2530] dark:text-white">
                        Subscription
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage your plan
                    </p>
                </div>

                {/* Current Plan */}
                <section className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#2C2D34] p-6 shadow-sm">
                    <div>
                        <h2 className="text-xl font-medium text-[#1D2530] dark:text-white">
                            Current Plan
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your active subscription
                        </p>
                    </div>
                    <div className="pt-4">
                        <div className="text-2xl font-bold text-[#1D2530] dark:text-white">
                            $0
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            7 days remaining
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-4">
                        <ProgressBar
                            label="Training"
                            current={1}
                            total={2}
                            icon={
                                <Icon name="training" size="16" className="text-blue-default" />
                            }
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
                            icon={
                                <MdOutlineFileDownload className="text-[#EF620F]" size={20} />
                            }
                        />
                        <ProgressBar
                            label="Members"
                            current={1}
                            total={1}
                            icon={<FiUsers className="text-blue-default" size={16} />}
                        />
                    </div>

                    {/* Trial warning */}
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
                                    Your free trial expires in 3 days. Upgrade now to continue
                                    using all features.
                                </p>
                            </div>
                        </div>
                        <button className="ml-4 flex items-center gap-2 ms-auto shrink-0 rounded-xl bg-[#EF620F] px-4 h-[52px] text-sm font-medium text-white hover:bg-[#EF620F]/90">
                            <MdArrowCircleUp size={24} />
                            Upgrade Now
                        </button>
                    </div>
                </section>

                {/* Upgrade Your Plan */}
                <section className="space-y-4">
                    <h3 className="text-base font-semibold text-[#1D2530] dark:text-white">
                        Upgrade Your Plan
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <PlanCard
                            highlight="recommended"
                            title="Professional"
                            priceMain="$39"
                            priceSub=""
                            subtitle="12-month commitment — billed monthly ($468/year)"
                            bullets={[
                                "Create 10 tool-specific trainings per user/month",
                                "Generate 10 job-specific safety meeting topics per user/month",
                                "2 team members included",
                                "Unlimited resource downloads (140+ OSHA-compliant forms)",
                                "Best for small-to-mid teams managing safety compliance",
                            ]}
                            cta="Get Started"
                        />
                        <PlanCard
                            title="Enterprise"
                            priceMain="$360"
                            subtitle="Billed annually — equivalent to $30/month"
                            bullets={[
                                "Create 15 tool-specific trainings per user/month",
                                "Generate 15 job-specific safety meeting topics per user/month",
                                "3 team members included",
                                "Unlimited resource downloads (140+ OSHA-compliant documents)",
                                "Best for larger teams needing high-volume safety documentation",
                            ]}
                            cta="Get Started"
                        />
                    </div>
                </section>

                {/* Billing History */}
                <section className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#2C2D34] p-6 shadow-sm">
                    <h3 className="text-base font-semibold flex items-center gap-2 text-[#1D2530] dark:text-white">
                        <Icon name="subscription" size="24"/>
                        Billing History
                    </h3>
                    <div className="mt-6 flex flex-col items-center justify-center rounded-xl p-10 text-center">
                       
                        <Icon name="subscription" size="24" className="h-10 w-10 text-gray-400 dark:text-gray-500"/>
                        <p className="mt-3 text-sm font-medium text-[#1D2530] dark:text-gray-400">
                            No billing history yet
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Upgrade to a paid plan to see your billing history
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

