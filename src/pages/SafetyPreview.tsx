import { useState } from "react";
import Button from "@/components/Button";
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";

import { FaRegEye } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
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
                </div>

                {/* Footer */}
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-7 pb-2">
                    Generated on {source?.date}
                </p>
            </div>
        </div>
    );
};

export default SafetyPreview;