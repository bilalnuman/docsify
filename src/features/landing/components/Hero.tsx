import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "@/components/Button";
import { FaRegStar } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Hero = () => {
    const { t } = useTranslation()
    return (
        <section className=" md:py-16 pt-10 text-center dark:bg-black hero">
            <div className=" flex justify-center w-full">
                <div className=" max-w-[850px] mx-auto z-10 sm:px-6 px-4 md:pb-[400px]">
                    <div className="text-[#1556D4] text-sm rounded-full px-2 py-1 border border-[#1556D4] w-fit mx-auto mb-3 flex items-center gap-x-2 dark:text-white">
                        <FaRegStar />
                        {t("aiPlatform")}
                    </div>
                    <h1 className="lg:text-5xl md:text-2xl text-xl font-bold leading-tight px-12 dark:text-white">
                        {t("empowerToolSpecific")}{" "}
                        <span className="text-[#1556D4]">{t("trainingCompliance")}</span> {" "}
                    </h1>
                    <div className="mt-4 text-[#1D2530E5] text-lg mx-auto dark:text-[#FFFFFF80]">
                        {t("marketingMessage")}
                        <div className="py-2" />
                        {t("safetyMeetingMessage")}
                        <div className="py-2" />
                       {t("formsMessage")}
                    </div>
                    <Button className="mt-6 mb-20 px-6 py-3 !h-[52px] bg-gradient rounded-xl text-white font-medium"
                        iconRight={<IoIosArrowRoundForward size={24} />}
                    >{t("startFreeTrial")}</Button>

                </div>
            </div>
        </section>
    );
};

export default Hero;
