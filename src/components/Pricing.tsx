import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import SwitchButton from "@/components/SwitchButton";
import { useGetPlans } from "@/hooks/useSubscription";
import { formErrorToast } from "@/util/formErrorToast";
import type { Plan } from "@/types";
import PlanCard from "@/components/pricing/PlanCard";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import StripeModal from "./modal/StripeModal";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import NotFound from "./Notfound";
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISH_KEY as string | undefined;
interface Props {
    isFree?: boolean,
}
const Pricing = ({ isFree = false }: Props) => {
    const { user } = useAppContext()
    const [open, setOpen] = useState<any>(false);
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [isYearly, setIsYearly] = useState(false);
    const navigate = useNavigate()

    const handleOpen = (plan: Plan) => {
        console.log(user, "pricing")
        if (user && Number(plan?.price) > 1) {
            setOpen(plan)
        }
        else if (Number(plan?.price) <= 1) {
           alert("Free plan selected. Please upgrade your account.")    
        }
        else {
            navigate("/login")
        }
    }

    useEffect(() => {
        if (!STRIPE_KEY) return;
        loadStripe(STRIPE_KEY)
            .then((s) => setStripe(s))
            .catch(() => toast.error("Failed to load Stripe.", {
                containerId: "stripe"
            }));
    }, []);

    const onConfirm = async (payload: any) => {
    };


    const { data: plansRes, isLoading, isError, error } = useGetPlans(
        isYearly ? "yearly" : "monthly"
    );

    useEffect(() => {
        if (isError && error) formErrorToast(error || "Something went wrong");
    }, [isError, error]);

    const formatUSD0 = useMemo(
        () =>
            new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
            }),
        []
    );

    const isFreePlan = (p: Plan) =>
        Number(p.price) === 0 ||
        /\btrial\b/i.test(p.name || "") ||
        String(p.plan_type || "").toLowerCase() === "tier_a";

    const plans = useMemo(() => {
        const all = (plansRes?.results ?? []).filter((p: any) => p.is_active);
        return all.filter((p: any) => Number(p.price) > 0 || (isFree && isFreePlan(p)));
    }, [plansRes, isFree]);

    const sorted = useMemo(
        () => [...plans].sort((a, b) => Number(a.price) - Number(b.price)),
        [plans]
    );
    const cheapestPaid = useMemo(() => {
        const paid = sorted.filter((p) => Number(p.price) > 0).map((p) => Number(p.price));
        return paid.length ? Math.min(...paid) : null;
    }, [sorted]);
    return (
        <section className={isFree ? "px-6 text-center mt-5" : "!mt-5"}>
            <h2 className={clsx("font-semibold text-[#1D2530] dark:text-white", isFree ? "text-3xl" : "text-xl mb-5")}>Choose Your Plan</h2>
            {
                isFree && <div className="text-lg text-[#1D253080] dark:text-[#FFFFFF80] mb-10">
                    Start with a free trial, then scale as your team grows
                </div>
            }

            {/* Monthly / Yearly toggle */}
            <div className="rounded-xl border dark:border-none bg-white dark:bg-dark-default-dark h-14 mb-8 flex items-center justify-center gap-6">
                <span className={clsx(isYearly ? "dark:text-[#FFFFFF80] text-[#1D253080]" : "dark:text-white text-[#1D2530]")}>
                    Monthly
                </span>
                <SwitchButton checked={isYearly} onChange={setIsYearly} />
                <span className={clsx(!isYearly ? "dark:text-[#FFFFFF80] text-[#1D253080]" : "dark:text-white text-[#1D2530]")}>
                    Yearly
                </span>
            </div>

            {/* Plans */}
            {isLoading ? (
                <div className="flex justify-center">
                    <Spinner />
                </div>
            ) : !sorted?.length ? <NotFound message="Faild to load plans" /> : (
                <div className={clsx("grid grid-cols-1 gap-6", isFree ? "md:grid-cols-3" : "md:grid-cols-2")}>
                    {sorted.map((plan, i) => {
                        const highlighted = cheapestPaid !== null && Number(plan.price) === cheapestPaid;
                        const priceMain = formatUSD0.format(Number(plan.price));
                        const intervalLabel = isYearly ? "/year" : "/month";
                        const features = (plan.description || "")
                            .split(",")
                            .map((s: any) => s.trim())
                            .filter(Boolean);

                        return (
                            <PlanCard
                                key={`${plan.id}-${i}`}
                                title={plan.name}
                                priceMain={priceMain}
                                intervalLabel={intervalLabel}
                                subtitle={plan.title ?? undefined}
                                features={features}
                                ctaLabel={Number(plan.price) === 0 ? "Start Free" : "Get Started"}
                                highlighted={highlighted}
                                badge={highlighted ? "Most Popular" : undefined}
                                onSelect={() => handleOpen(plan)}
                                className={Number(plan.price || 0) < 10 ? "free-card relative" : ""}
                            />
                        );
                    })}
                </div>
            )}

            {stripe && (
                <Elements stripe={stripe}>
                    <StripeModal
                        open={open}
                        onClose={() => setOpen(false)}
                        onConfirm={onConfirm}
                    />
                </Elements>
            )}
        </section>
    );
};

export default Pricing;
