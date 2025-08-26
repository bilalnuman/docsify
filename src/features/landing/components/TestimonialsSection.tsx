import React from "react";
import { AiFillStar } from "react-icons/ai";

type Testimonial = {
    quote: string;
    name: string;
    role: string;
};

const TESTIMONIALS: Testimonial[] = Array.from({ length: 6 }).map(() => ({
    quote:
        "We do piece work, so the crew brings different power tools to every job. With Docsify.io, it's easy to create tool-specific training for whatever they bring. No more scrambling with generic training to cover all models.",
    name: "Andrew King",
    role: "Superintendent, Master Framing",
}));

const Avatar: React.FC<{ name: string }> = ({ name }) => {
    const init = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((s) => s[0]!.toUpperCase())
        .join("");

    return (
        <div className="w-8 h-8 rounded-full bg-[#1556D4] text-white flex items-center justify-center text-xs font-semibold">
            {init}
        </div>
    );
};

const TestimonialCard: React.FC<Testimonial> = ({ quote, name, role }) => (
    <div className="rounded-2xl border border-slate-200 bg-white dark:bg-[#2C2D34] p-5 shadow-sm dark:border-transparent">
        {/* Stars */}
        <div className="flex gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
                <AiFillStar key={i} className="w-4 h-4" />
            ))}
        </div>

        {/* Quote */}
        <p className="mt-3 text-[15px] leading-6 text-slate-700 dark:text-[#FFFFFF80]">{quote}</p>

        {/* Author */}
        <div className="mt-4 flex items-center gap-3">
            <Avatar name={name} />
            <div>
                <div className="text-sm font-medium text-[#1556D4] dark:text-white">{name}</div>
                <div className="text-xs text-slate-500 dark:text-[#FFFFFF80]">{role}</div>
            </div>
        </div>
    </div>
);

const TestimonialsSection: React.FC = () => {
    return (
        <section>
            <div className="px-6">
                <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white">
                    What Our Clients Say
                </h2>
                <p className="mt-1 text-center text-sm text-slate-500 dark:text-[#FFFFFF80]">
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
