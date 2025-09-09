import { FiCheckCircle } from "react-icons/fi";
import Card from "./Card";

const FallingDebriComponent = ({ source }: any) => {
  return (
    <div className="flex flex-col pt-5">
      <div className="text-[28px] font-semibold text-dark-default dark:text-white pb-4">
        Falling Debris
      </div>

      <div className="bg-white dark:bg-[#2C2D34] border border-gray-200 dark:border-white/10 p-4 rounded-xl">
        <div className="flex items-center sm:text-xl text-[#1D2530] dark:text-white font-medium gap-1 pb-4">
          <FiCheckCircle />
          Training Report Generated
        </div>

        {/* Cards */}
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
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 dark:text-gray-300/70 mt-10 pb-5">
          {source?.date ? `Generated on ${source?.date}` : null}
        </p>
      </div>
    </div>
  );
};

export default FallingDebriComponent;