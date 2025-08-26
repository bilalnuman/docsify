import { useState } from "react";
import { LuCircleCheckBig } from "react-icons/lu";
import AdminOnboardingFormModal from "../../../components/modal/AdminOnboardingFormModal";
import Button from "../../../components/Button";
import clsx from "clsx";

const plans = [
    {
        name: "Professional",
        price: "$39",
        features: [
            "10 AI-generated documents per month",
            "3 team members included",
            "Unlimited stored documents",
            "Priority support"
        ],
        highlighted: true
    },
    {
        name: "Enterprise",
        price: "$360 / year",
        features: [
            "25 AI-generated documents per month",
            "Unlimited team members",
            "Unlimited stored documents",
            "Advanced analytics"
        ],
        highlighted: false
    },
    {
        name: "Enterprise",
        price: "$360 / year",
        features: [
            "25 AI-generated documents per month",
            "Unlimited team members",
            "Unlimited stored documents",
            "Advanced analytics"
        ],
        highlighted: false
    }
];

const Pricing = () => {
    const [open, setOpen] = useState(false);
    return (
        <section className="py-11 text-center px-6" >
            <h2 className="text-3xl font-bold text-[#1D2530] dark:text-white">Choose Your Plan</h2>
            <div className="text-lg text-[#1D253080] pb-11 dark:text-[#FFFFFF80]">Start with a free trial, then scale as your team grows</div>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, i) => (
                    <div
                        key={i}
                        className={`border relative rounded-lg p-6 shadow-sm bg-white dark:bg-[#2C2D34] ${plan.highlighted ? "border-[#1556D4] shadow-lg dark:border-white" : "border-gray-200 dark:border-transparent"
                            }`}
                    >
                        {plan.highlighted&&<span className=" absolute rounded-full -top-3 start-1/2 -translate-x-1/2 bg-[#1556D4] px-2 text-white text-xs py-1 dark:bg-white dark:text-dark-default">Most Popular</span>}
                        <h3 className="text-lg font-medium text-[#1D2530] dark:text-white">{plan.name}</h3>
                        <p className="text-2xl font-bold mt-2 text-[#1D2530] dark:text-white">{plan.price}
                            <span className="text-[#1D253080] font-normal">/mo</span>
                        </p>
                        <div className="text-[#1D2530] dark:text-white mt-4 space-y-2 text-left flex flex-col">
                            {plan.features.map((f, idx) => (
                                <div key={idx} className="flex items-center space-x-2 gap-2">
                                    <LuCircleCheckBig className="text-[#1556D4] dark:text-white" />
                                    {f}</div>
                            ))}
                        </div>
                        <Button onClick={() => setOpen(true)}
                        variant={plan.highlighted ? "primary" : "outline"}
                            className={clsx("w-full mt-5 hover:!bg-[#1556D4] dark:bg-white dark:!text-dark-default dark:hover:!border-transparent dark:hover:!text-white hover:text-white h-10",plan.highlighted?"":"")}
                        >Get Started</Button>
                    </div>
                ))}
            </div>
            <AdminOnboardingFormModal
                setOpen={setOpen}
                open={open}
            />
        </section>
    );
};

export default Pricing;
