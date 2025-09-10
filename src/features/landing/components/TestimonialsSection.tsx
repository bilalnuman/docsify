import React from "react";
import { AiFillStar } from "react-icons/ai";
import andrew from "@/assets/images/Andrew King.jpg"
import gabriela from "@/assets/images/Gabriela Morales.jpg"
import joseph from "@/assets/images/Joseph Anderson.jpg"
import michael from "@/assets/images/Michael Aitken.jpg"
import eric from "@/assets/images/Eric Jenkins.jpg"
import henry from "@/assets/images/Henry Richardson.jpg"

type Testimonial = {
    pic: string;
    quote: string;
    name: string;
    role: string;
};

const TESTIMONIALS: Testimonial[] = [
    {
        pic: andrew,
        name: "Andrew King",
        role: "Superintendent, Master Framing",
        quote:
            "We do piece work, so the crew brings different power tools to every job. With Docsify.io, it’s easy to create tool-specific training for whatever they bring. No more scrambling with generic training to cover all models.",
    },
    {
        pic: gabriela,
        name: "Gabriela Morales",
        role: "Safety manager, Riverside Construction",
        quote: `Safety manager, Riverside Construction
The safety meeting feature is a game-changer. We recently had to work near trenching after rain. I generated a job-specific meeting with hazards and prevention steps. `,
    },
    {
        pic: joseph,
        name: "Joseph Anderson",
        role: "Safety Manager, Heavy Drilling",
        quote: "In 20 years of drilling, I’ve never seen software make tool-specific training this easy. Uploading a manual and getting a ready-to-train document in minutes saves us hours. Docsify.io is now part of every new hire’s first day.",
    },
    {
        pic: michael,
        name: "Michael Aitken",
        role: "Supervisor, Freeport",
        quote: "We got hit with a lawsuit last year for lack of documented training. If we’d had Docsify.io tool-specific training then, it wouldn’t have happened. Now everything’s documented and no chance we repeat that mistake.",
    },
    {
        pic: eric,
        name: "Eric Jenkins",
        role: "Safety Director, Stone Construction ",
        quote: "Our government contract required a full set of OSHA safety forms. Docsify.io library had every single one. No scrambling, no paying extra. Delivered them same day and passed inspection without a single correction. ",
    },
    {
        pic: henry,
        name: "Henry Richardson",
        role: "Co-Founder, Builder",
        quote: "A safety consultant quoted me $2,000 for OSHA compliant forms. Docsify.io gave me all the forms and more ready-to-use compliance documents for a fraction. Worth every penny.",
    },
];

const TestimonialCard: React.FC<Testimonial> = ({ quote, name, role, pic }) => (
    <div className="rounded-2xl border border-slate-200 bg-white dark:bg-[#2C2D34] p-5 shadow-sm dark:border-transparent">
        <div className="flex gap-1 text-[#FAB515]">
            {Array.from({ length: 5 }).map((_, i) => (
                <AiFillStar key={i} className="w-4 h-4" />
            ))}
        </div>
        <p className="mt-3 text-[15px] leading-6 text-[#1D253080] dark:text-[#FFFFFF80]">{quote}</p>

        <div className="mt-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1556D4] text-white flex items-center justify-center text-xs font-semibold">
                <img src={pic} alt="" className="w-full object-cover h-full rounded-full" />
            </div>
            <div>
                <div className="text-sm font-medium text-[#1556D4] dark:text-white">{name}</div>
                <div className="text-xs text-[#1D253080] dark:text-[#FFFFFF80]">{role}</div>
            </div>
        </div>
    </div>
);

const TestimonialsSection: React.FC = () => {
    return (
        <section className="mt-10">
            <div className="sm:px-6 px-4">
                <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white">
                    What Our Clients Say
                </h2>
                <p className="mt-1 text-center text-sm text-[#1D253080] dark:text-[#FFFFFF80]">
                    Check out the feedback that our clients are giving after using our services
                </p>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {TESTIMONIALS.map((t, idx) => (
                        <TestimonialCard key={idx} {...t} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
