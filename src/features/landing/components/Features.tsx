import React from "react";
import { AiOutlineSafety, AiOutlineTeam, AiOutlineGlobal } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";

const features = [
    { icon: <AiOutlineSafety size={24} />, title: "AI Powered Training", desc: "Auto-generate tool-specific training with PPE, operation, safety, emergency procedures, and signature lines." },
    { icon: <MdOutlineEventNote size={24} />, title: "Safety Meetings", desc: "Enter a subject to auto-generate a job-specific safety topic with hazards, safety points, and attendance sheet." },
    { icon: <AiOutlineTeam size={24} />, title: "Compliance Forms", desc: "Access 140+ OSHA-compliant forms — Fall Protection, Rescue, Exposure Control, Inspections, and more." },
    { icon: <AiOutlineGlobal size={24} />, title: "Multi-Language", desc: "Generate docs and use the platform in English or Spanish for crew compliance." },
];

const Features = () => {
    return (
        <section className="dark:bg-black">
            <div className="sm:px-6 px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-center bg-re">
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
