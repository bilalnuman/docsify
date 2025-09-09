import { FiCheckCircle } from "react-icons/fi";
<<<<<<< HEAD
import Card from "./Card";

const FallingDebriComponent = ({ source }: any) => {
=======
import { FaRegEye } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import Icon from "../../../components/Icon";
import Button from "../../../components/Button";

const FallingDebriComponent = () => {
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
  return (
    <div className="flex flex-col pt-5">
      <div className="text-[28px] font-semibold text-dark-default dark:text-white pb-4">
        Falling Debris
      </div>

      <div className="bg-white dark:bg-[#2C2D34] border border-gray-200 dark:border-white/10 p-4 rounded-xl">
<<<<<<< HEAD
        <div className="flex items-center sm:text-xl text-[#1D2530] dark:text-white font-medium gap-1 pb-4">
=======
        <div className="flex items-center text-xl text-[#1D2530] dark:text-white font-medium gap-1 pb-4">
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
          <FiCheckCircle />
          Training Report Generated
        </div>

        {/* Cards */}
<<<<<<< HEAD
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5 mt-5">
          {/* Card 1 */}
          <Card
            data={{ url: source?.doc_output, title: source?.title }}
            index={2}
            type="DOC"
          />
          <Card
            data={{ url: source?.pdf_output, title: source?.title }}
            index={2}
            type="PDF"
          />
          <Card
            data={{ url: source?.spanish_doc_output, title: source?.title }}
            index={2}
            type="Spanish DOC"
          />
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1A1B20] rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-4 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#1556D41A] dark:bg-white/10 w-11 h-11 rounded-full flex items-center justify-center">
                  {index === 2 ? (
                    <Icon name="glob" className="text-blue-500" />
                  ) : (
                    <Icon name="training" className="text-blue-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-medium text-[#1D2530] dark:text-white">
                    Training Manual
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-300/70">
                    DOC Format
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <Button as="a" href="/training/preview/1" variant="outline" className="flex-1 !border-[#1556D4] !text-[#1556D4] hover:!text-white hover:!bg-[#1556D4]" iconLeft={<FaRegEye size={15} />}>
                  Preview
                </Button>
                <Button as="a" href="/training/preview/1" variant="outline" className="flex-1 !border-[#1556D4] !text-[#1556D4] hover:!text-white hover:!bg-[#1556D4]" iconLeft={<MdOutlineFileDownload size={15} />}>
                  Download
                </Button>
              </div>
            </div>
          ))}
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 dark:text-gray-300/70 mt-10 pb-5">
<<<<<<< HEAD
          {source?.date ? `Generated on ${source?.date}` : null}
=======
          Generated on 04/08/2025
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
        </p>
      </div>
    </div>
  );
};

export default FallingDebriComponent;