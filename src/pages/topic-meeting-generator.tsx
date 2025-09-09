<<<<<<< HEAD
import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import Icon from "@/components/Icon";
import FileUploader, { type FileUploaderHandle } from "@/components/fileUploader";
import Button from "@/components/Button";
import InputField from "@/features/auth/components/InputField";
import { useCreateTopicGenerations } from "@/hooks/useSafetyMeeting";
import NotFound from "@/components/Notfound";
import { formErrorToast } from "@/util/formErrorToast";
import { toast } from "react-toastify";
import NewSafetyModalForm from "@/components/modal/NewSafetyModal";
import { useLocation } from "react-router-dom";
import type { NewSafetyModalFormValues } from "@/features/auth/schemas/authSchema";
import Card from "@/features/Dashboard/training/Card";


const TopicMeetingGenerator = () => {
    const locaction = useLocation()
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState<any[]>([])
    const [value, setValue] = useState<string>("")
    const uploaderRef = useRef<FileUploaderHandle>(null);
    const { mutateAsync: createTopicGeneration, isPending, data: fileData } = useCreateTopicGenerations()
    const { address, date, title, project_name } = (locaction?.state ?? {}) as Partial<NewSafetyModalFormValues>;

    const handleTopicGeneration = () => {
        const formData = new FormData();
        formData.append("text_input", value || "");
        formData.append('uploaded_file  ', files[0]);
        if (title && project_name && date && address) {
            formData.append("title", title);
            formData.append("project_name", project_name);
            formData.append("date", date);
            formData.append("address", address);
        }
        if (files[0]) {
            formData.append('input_type', 'pdf');
        }
        createTopicGeneration(formData, {
            onSuccess() {
                toast.success("Training Generated Successfully")
                uploaderRef.current?.reset()
                setFiles([])
            },
            onError(error) {
                formErrorToast(error)
            },
        })

    }
    const source = fileData?.data

=======
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import FileUploader from "../components/fileUploader";
import Button from "../components/Button";
import InputField from "../features/auth/components/InputField";


const TopicMeetingGenerator = () => {
    const [files, setFiles] = useState<any[]>([])
    const [value, setValue] = useState<string>()
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    return (
        <div className="flex flex-col pt-6">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <div className="text-[28px] font-semibold text-dark-default dark:text-white">Topic Meeting Generator</div>
                    <div className="text-[#1D253080] dark:text-white pt-2">Create contextual safety meeting reports from documents or text</div>
                </div>
                <div className="text-sm font-medium dark:text-white text-dark-default rounded-full border border-[#1D253026] px-3 py-2 flex items-center gap-[6px]">
                    <Icon name="training" className="text-[10px]" /> 7/10 Used
                </div>
            </div>
            <div className="rounded-xl p-4 bg-white dark:bg-[#2C2D34]">
                <div className="flex items-center justify-between mb-3">
                    <div className=" font-medium text-[#1D2530] dark:text-white">Monthly Usage</div>
                    <div className="text-sm text-[#1D253080] dark:text-white">7 of 10</div>
                </div>
                <div className=" rounded-xl bg-[#1556D41A] h-3 relative dark:bg-[#1A1B20]">
                    <div className="bg-[#1556D4] rounded-full absolute start-0 w-full top-0 z-10 h-full max-w-[70%]"></div>
                </div>
            </div>
<<<<<<< HEAD
            <div className="rounded-xl p-4 bg-[#FBFBFB] dark:bg-[#2C2D34] mt-5">
=======
            <div className="rounded-xl p-4 bg-white dark:bg-[#2C2D34] mt-5">
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                <div className="flex items-center font-medium text-xl text-[#1D2530] dark:text-white gap-2">
                    <FiUpload className="dark:text-white" />
                    Create Meeting Report</div>
                <div className="mt-5 flex items-center justify-center flex-col">

<<<<<<< HEAD
                    <div className="border-2 px-4 bg-white dark:bg-[#1A1B20] border-dashed dark:border-white/20 border-gray-300 w-full rounded-lg h-[144px] mb-5 flex items-center justify-center">
=======
                    <div className="border-2 px-4 dark:bg-[#1A1B20] border-dashed dark:border-white/20 border-[#aaa] w-full rounded-lg h-[144px] mb-5 flex items-center justify-center">
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                        <InputField
                            icon={<MdOutlineFileUpload className="dark:text-white" />}
                            iconPosition="left"
                            value={value}
                            onChange={(e: any) => setValue(e.target.value)}
                            placeholder="Enter your safety inquiry or topic here..."
                            classNames={{
                                container: "max-w-[532px] !mb-0",
<<<<<<< HEAD
                                input: "ps-[60px] dark:!bg-transparent",
                                iconClass: "h-full bg-[#1D25301A] rounded flex items-center justify-center w-12 !start-0 dark:bg-white/10"
=======
                                input: "ps-16 dark:!bg-transparent",
                                iconClass: "h-full bg-[#1D25301A] rounded flex items-center justify-center w-12 -start-0 dark:bg-white/10"
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                            }}
                        />
                    </div>
                    <div className="h-[260px] w-full">
<<<<<<< HEAD
                        <FileUploader className="w-full"
                            allowedTypes={["application/pdf", ".pdf"]}
                            ref={uploaderRef}
                            onFilesChange={(file) => setFiles(file)}                        >
                            <div className="h-14 w-14 bg-[#1556D41A] dark:bg-[#2C2D34] p-3 rounded-xl flex items-center justify-center">
                                <FiUpload size={32} className="text-[#1556D4] dark:text-white" />
                            </div>
                            {files?.[0] ? <div className="mt-3">{files?.[0]?.name}</div> : <>
                                <div className="text-xl font-medium text-[#1D2530] dark:text-white pt-4">Drop Your PDF here</div>
                                <div className="text-[#1D253080] text-sm dark:text-white">Or click to browse (PDF files only)</div>
                            </>}
=======
                        <FileUploader className="w-full" multiple
                            // allowedTypes={["pdf"]}
                            onFilesChange={(file) => setFiles(file)}
                        >
                            <div className="h-14 w-14 bg-[#1556D41A] dark:bg-[#2C2D34] p-3 rounded-xl flex items-center justify-center">
                                <FiUpload size={32} className="text-[#1556D4] dark:text-white" />
                            </div>
                            <div className="text-xl font-medium text-[#1D2530] dark:text-white pt-4">Drop Your PDF here</div>
                            <div className="text-[#1D253080] text-sm dark:text-white">Or click to browse (PDF files only)</div>
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                        </FileUploader>
                    </div>
                </div>
                <div>
<<<<<<< HEAD
                    <>

                        {
                            files?.[0] && fileData?.status ? <NotFound
                                message="Data not found!"
                                buttonText="Reload"
                                showHomeButton={false}
                            /> : source &&
                            <div className="grid grid-cols-3 gap-5 mt-5">
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
                        }
                        {
                            files?.[0] ?
                                <Button loading={isPending} className="w-full mt-5 h-11" iconLeft={<Icon name="training" />} onClick={handleTopicGeneration}>Generate Training Materials</Button>
                                : null}

                        <div className="text-end mt-6 flex items-center justify-between">
                            <p className="text-sm text-gray-400 dark:text-gray-300/70 mt-10 pb-5">
                                {source?.date ? `Generated on ${source?.date}` : null}
                            </p>
                            <Button variant="outline" onClick={() => setOpen(true)} className="h-11">
                                Generate New Report
                            </Button>
                        </div>
                    </>
                </div>
            </div>
            <NewSafetyModalForm
                open={open}
                setOpen={setOpen}
                onConfirm={(data) => { console.log(data) }}
            />
=======
                    <div className="grid md:grid-cols-3 gap-5 mt-5">
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
                        <Button variant="outline" className="flex-1 h-11 hover:!text-white white hover:!bg-white/10">
                            Generate New Report
                        </Button>
                    </div>
                </div>
                {
                    files.length ?
                        <Button className="w-full mt-5 h-11" iconLeft={<Icon name="training" />} onClick={() => console.log("clicked")}>Generate Training Materials</Button>
                        : null}


            </div>
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
        </div >
    );
};

export default TopicMeetingGenerator;
