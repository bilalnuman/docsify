<<<<<<< HEAD
import { useState } from "react";
import Button from "@/components/Button";
=======
import React, { useState } from "react";
import Button from "../components/Button";
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";

import { FaRegEye } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
<<<<<<< HEAD
import Icon from "@/components/Icon";
import { useGetFolderFiles } from "@/hooks/useSafetyMeeting";
import { useParams } from "react-router-dom";
import NotFound from "@/components/Notfound";
import Spinner from "@/components/Spinner";
import Card from "@/features/Dashboard/training/Card";

const SafetyPreview = () => {
    const [files, setFiles] = useState([]);
    const { id: idParam } = useParams<{ id?: string }>();
    const id = idParam ? Number(idParam) : NaN;
    if (!idParam || Number.isNaN(id)) {
        return <NotFound message="Invalid folder ID." />;
    }

    const { data, isLoading, isError, error } = useGetFolderFiles(id);
    if (isLoading) {
        return (
            <div className="col-span-12 text-center">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return <NotFound message="Failed to load data." />;
    }

    const source = data

    if (!data) {
        return <NotFound message="Data not found!" />;
    }
=======
import Icon from "../components/Icon";

const SafetyPreview = () => {
    const [files, setFiles] = useState([]);
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

    return (
        <div className="flex flex-col pt-6">
            {/* Title */}
            <div className="text-[28px] font-semibold text-dark-default dark:text-white pb-5">
                Falling Debris
            </div>

            {/* Meeting Report */}
            <div className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl">
                <div className="flex items-center text-xl text-[#1D2530] dark:text-white font-medium gap-1 pb-4">
                    <FiCheckCircle />
<<<<<<< HEAD
                    Safety Meeting Generated
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
=======
                    Meeting Report Generated
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-5">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-[#1A1B20] rounded-xl shadow-sm border border-gray-200 dark:border-transparent p-4 flex flex-col"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-[#1556D41A] dark:bg-blue-900 w-11 h-11 rounded-full flex items-center justify-center">
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
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                        DOC Format
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Button as="a" href="/training/preview/1" variant="outline" className="flex-1 !border-[#1556D4] !text-[#1556D4] hover:!text-white white hover:!bg-[#1556D4]" iconLeft={<FaRegEye size={15} />}>
                                    Preview
                                </Button>
                                <Button as="a" href="/training/preview/1" variant="outline" className="flex-1 !border-[#1556D4] !text-[#1556D4] hover:!text-white white hover:!bg-[#1556D4]" iconLeft={<MdOutlineFileDownload size={15} />}>
                                    Download
                                </Button>
                            </div>
                        </div>
                    ))}
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                </div>

                {/* Footer */}
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-7 pb-2">
<<<<<<< HEAD
                    Generated on {source?.date}
                </p>
            </div>
=======
                    Generated on 04/08/2025
                </p>
            </div>

            {/* Uploaded Document */}
            <div className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl mt-5">
                <div className="flex items-center text-xl text-[#1D2530] dark:text-white font-medium gap-1 pb-4">
                    <FiCheckCircle />
                    Uploaded Document
                </div>

                {!files.length ? (
                    <div className="flex justify-center items-center flex-col gap-3 w-full dark:bg-[#1A1B20] py-10 rounded-xl border border-dashed dark:border-transparent">
                        <Button variant="outline" className="w-[250px] hover:!bg-[#1556D4] hover:!border-[#1556D4] hover:text-white" iconLeft={<MdOutlineFileUpload size={15} />}>
                            Upload Signed Document
                        </Button>
                        <Button variant="outline" className="hover:!bg-[#1556D4] hover:text-white hover:!border-[#1556D4]" iconLeft={<IoCameraOutline size={15} />}>
                            Photograph Signed Document
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-3 gap-5">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-[#1A1B20] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-[#1556D41A] dark:bg-blue-900 w-11 h-11 rounded-full flex items-center justify-center">
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
                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                DOC Format
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
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
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-7 pb-2">
                            Generated on 04/08/2025
                        </p>
                    </>
                )}
            </div>
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
        </div>
    );
};

export default SafetyPreview;