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
            <div className="rounded-xl p-4 bg-white dark:bg-[#2C2D34] mt-5">
                <div className="flex items-center font-medium text-xl text-[#1D2530] dark:text-white gap-2">
                    <FiUpload className="dark:text-white" />
                    Create Meeting Report</div>
                <div className="mt-5 flex items-center justify-center flex-col">

                    <div className="border-2 px-4 dark:bg-[#1A1B20] border-dashed dark:border-white/20 border-[#aaa] w-full rounded-lg h-[144px] mb-5 flex items-center justify-center">
                        <InputField
                            icon={<MdOutlineFileUpload className="dark:text-white" />}
                            iconPosition="left"
                            value={value}
                            onChange={(e: any) => setValue(e.target.value)}
                            placeholder="Enter your safety inquiry or topic here..."
                            classNames={{
                                container: "max-w-[532px] !mb-0",
                                input: "ps-16 dark:!bg-transparent",
                                iconClass: "h-full bg-[#1D25301A] rounded flex items-center justify-center w-12 -start-0 dark:bg-white/10"
                            }}
                        />
                    </div>
                    <div className="h-[260px] w-full">
                        <FileUploader className="w-full" multiple
                            // allowedTypes={["pdf"]}
                            onFilesChange={(file) => setFiles(file)}
                        >
                            <div className="h-14 w-14 bg-[#1556D41A] dark:bg-[#2C2D34] p-3 rounded-xl flex items-center justify-center">
                                <FiUpload size={32} className="text-[#1556D4] dark:text-white" />
                            </div>
                            <div className="text-xl font-medium text-[#1D2530] dark:text-white pt-4">Drop Your PDF here</div>
                            <div className="text-[#1D253080] text-sm dark:text-white">Or click to browse (PDF files only)</div>
                        </FileUploader>
                    </div>
                </div>
                <div>
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
        </div >
    );
};

export default TopicMeetingGenerator;
