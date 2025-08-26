import React from "react";
import { AiOutlineSafety, AiOutlineTeam, AiOutlineGlobal } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";

const features = [
    { icon: <AiOutlineSafety size={24} />, title: "AI Powered Training", desc: "Generate engaging training material in minutes" },
    { icon: <MdOutlineEventNote size={24} />, title: "Safety Meetings", desc: "Document and streamline your safety meetings" },
    { icon: <AiOutlineTeam size={24} />, title: "Team Management", desc: "Track team progress and assign training" },
    { icon: <AiOutlineGlobal size={24} />, title: "Multi-Language", desc: "Full support for multiple languages" },
];

const Features = () => {
    return (
        <section className="dark:bg-black">
            <div className="px-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                {features.map((f, i) => (
                    <div key={i} className="bg-white dark:bg-[#2C2D34] p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center justify-center">
                        <div className="text-blue-600 mb-4 w-11 h-11 rounded-xl flex items-center justify-center bg-[#1556D41A] dark:bg-white/10 dark:text-white">{f.icon}</div>
                        <h3 className="font-semibold text-[#1556D4] dark:text-white">{f.title}</h3>
                        <p className="text-[#1D253080] dark:text-[#FFFFFF80] text-sm mt-2">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
