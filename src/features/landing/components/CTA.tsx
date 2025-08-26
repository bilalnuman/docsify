import { IoIosArrowRoundForward } from "react-icons/io";

const CTA = () => {
    return (
        <section className="text-center bg-white dark:bg-[#2C2D34] py-12">
            <div className="bg-[#1556D4] dark:bg-black max-w-[850px] mx-auto py-10 rounded-xl">
                <h3 className="text-xl font-semibold text-white px-4">
                    Ready to Revolutionize Your Safety Program?
                </h3>
                <p className="text-[#FFFFFF80]  mt-2 max-w-[580px] mx-auto px-4">
                    Auto-generate training docs, safety meetings, and compliance forms in English or Spanish.
                </p>
                <button className="mt-6 px-6 py-3 bg-white text-[#1556D4] hover:bg-white/90 rounded-xl flex items-center justify-center mx-auto">
                    Start Free Trial Today
                    <IoIosArrowRoundForward size={24} />
                </button>

            </div>
        </section>
    );
};

export default CTA;
