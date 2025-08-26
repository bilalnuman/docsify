import { useState } from "react";
import Button from "../../../components/Button";
import FileUploader from "../../../components/fileUploader";
import Icon from "../../../components/Icon";
import { FiUpload } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { formErrorToast } from "../../../util/formErrorToast";
import NewTrainingDetailsModal from "../../../components/modal/NewTrainingDetailsModal";
import { useCreateTrainingGenerations, useTrainingGenerations } from "../../../hooks/useTraining";
import { toast } from "react-toastify";

type TrainingNavState = {
  trainingTitle: string;
  trainingDate: string;
};


const TrainingGeneratorComponent = () => {

  const { data: trainingData, isLoading, isError, error } = useTrainingGenerations()
  const { mutateAsync: create, isPending } = useCreateTrainingGenerations()

  const [file, setFile] = useState<File>()
  const [openForm, setOpenForm] = useState(false);
  const { state } = useLocation();
  const { trainingTitle, trainingDate } = (state ?? {}) as Partial<TrainingNavState>;

  const onSubmit = async () => {
    const body = new FormData();
    if (file) {
      body.append("original_file", file);
    }
    create(body, {
      onSuccess(data) {
        toast.success(data?.message, { toastId: "Training created successfully" });
      },
      onError(error) {
        formErrorToast(error);
      },
    })
  };


  return (
    <div className="flex flex-col pt-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[28px] font-semibold text-dark-default dark:text-white">Training Generator</div>
          <div className="text-[#1D253080] dark:text-white/50 pt-2">Upload safety documents to generate comprehensive training materials</div>
        </div>
        <div className="text-sm font-medium dark:text-white text-dark-default rounded-full border border-[#1D253026] dark:border-white px-3 py-2 flex items-center gap-[6px]">
          <Icon name="training" className="text-[10px] dark:text-white" /> 7/10 Used
        </div>
      </div>

      <div className="rounded-xl p-4 bg-white dark:bg-[#2C2D34]">
        <div className="flex items-center justify-between mb-3">
          <div className=" font-medium text-[#1D2530] dark:text-white">Monthly Usage</div>
          <div className="text-sm text-[#1D253080] dark:text-white/50">7 of 10</div>
        </div>
        <div className=" rounded-xl bg-[#1556D41A] h-3 relative dark:bg-[#1A1B20]">
          <div className="bg-[#1556D4]  rounded-full absolute start-0 w-full top-0 z-10 h-full max-w-[70%]"></div>
        </div>
      </div>

      <div className="rounded-xl p-4 bg-white mt-5 dark:bg-[#2C2D34]">
        <div className="flex items-center font-medium text-xl text-[#1D2530] gap-2 dark:text-white">
          <FiUpload />
          Upload Safety Document</div>
        <div className="mt-5 h-[280px] flex items-center justify-center flex-col">
          <FileUploader
            className="w-full"
            onFilesChange={(file: File[]) => setFile(file[0])}
            showPreview={true}
            allowedTypes={["application/pdf", ".pdf"]}
          >
            <div className="h-14 w-14 bg-[#1556D41A] dark:bg-[#2C2D34] p-3 rounded-xl flex items-center justify-center">
              <FiUpload size={32} className="text-[#1556D4] dark:text-white" />
            </div>
            <div className="text-xl font-medium text-[#1D2530] dark:text-white pt-3">Drop Your PDF here</div>
            <div className="text-[#1D253080] text-sm dark:text-white/50">Or click to browse (PDF files only)</div>
          </FileUploader>
        </div>
        {!file && trainingData?.length > 0 &&
          <div>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {/* Card 1 */}
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="bg-white dark:bg-[#1A1B20] rounded-xl shadow-sm border border-gray-200 dark:border-transparent p-4 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#1556D41A] w-11 h-11 rounded-full flex items-center justify-center">
                      {
                        index === 2 ? <Icon name="glob" className="text-blue-500" /> : <Icon name="training" className="text-blue-500" />
                      }
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-[#1D2530] dark:text-white">
                        Training Manual
                      </h3>
                      <p className="text-xs text-gray-400">DOC Format</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button variant="outline" className="flex-1 !border-[#1556D4] !text-[#1556D4] hover:!text-white white hover:!bg-[#1556D4]" iconLeft={<FaRegEye size={15} />}>
                      Preview
                    </Button>
                    <Button variant="outline" className="flex-1 !border-[#1556D4] !text-[#1556D4] hover:!text-white white hover:!bg-[#1556D4]" iconLeft={<MdOutlineFileDownload size={15} />}>
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-end mt-6">
              <Button variant="outline" onClick={() => setOpenForm(true)} className="flex-1 h-11 hover:!text-white white hover:!bg-white/10" iconLeft={<MdOutlineFileDownload size={15} />}>
                Generate New Training
              </Button>
            </div>
          </div>
        }
        {
          file ?
            <Button loading={isPending} className="w-full mt-5 h-11" iconLeft={<Icon name="training" />} onClick={onSubmit}>Generate Training Materials</Button>
            : null}


      </div>
      <NewTrainingDetailsModal
        open={openForm}
        setOpen={setOpenForm}
      />
    </div>
  );
};

export default TrainingGeneratorComponent;
