import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "@/components/Button";
import { FaRegStar } from "react-icons/fa6";

const Hero = () => {
    return (
        <section className=" py-16 text-center dark:bg-black hero">
            <div className=" flex justify-center w-full pb400">
                <div className=" max-w-[850px] mx-auto z-10 sm:px-6 px-4">
                    <div className="text-[#1556D4] text-sm rounded-full px-2 py-1 border border-[#1556D4] w-fit mx-auto mb-3 flex items-center gap-x-2 dark:text-white">
                        <FaRegStar />
                        AI-Powered Safety & Compliance Platform</div>
                    <h1 className="lg:text-5xl md:text-2xl text-xl font-bold leading-tight px-12 dark:text-white">
                        Empower Tool-Specific{" "}
                        <span className="text-[#1556D4]">Training</span> {" "}
                        <span className="text-[#1556D4]">& Compliance</span>
                    </h1>
                    <div className="mt-4 text-[#1D2530E5] text-lg mx-auto dark:text-[#FFFFFF80]">
                        Untrained workers cause accidents and OSHA fines. Stop wasting hours creating training. Upload any manual → instantly generate tool-specific training using OSHA guidelines. Print, sign, and stay compliant in English or Spanish.
                        <div className="py-2" />
                        Don’t waste time on generic safety talks. Upload a manual or type a subject to instantly generate a job-specific safety meeting with hazards and OSHA safety guidelines.
                        <div className="py-2" />
                        Access 140+ ready-to-use, compliant PDF forms from Health & Safety Plan and Exposure Control Plan to Fall Protection Plan, Rescue Plan, Inspections, and OSHA recordkeeping forms.
                    </div>
                    <Button className="mt-6 mb-6 px-6 py-3 !h-[52px] bg-gradient rounded-xl text-white font-medium"
                        iconRight={<IoIosArrowRoundForward size={24} />}
                    >Start Free Trial</Button>

                </div>
            </div>
        </section>
    );
};

export default Hero;
