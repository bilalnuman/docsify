import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { FaRegEye } from 'react-icons/fa'
import { MdOutlineFileDownload } from 'react-icons/md'
interface PropsTypes {
    index: number,
    data: any,
    type: string
}
const Card = ({ data, type, index = 2 }: PropsTypes) => {

    const handlePreview = (type: string, url: string) => {
        if (type?.toLowerCase() === "pdf") {
            window.open(url, "_blank");
        }
        else if (type?.toLowerCase() === "doc" || type?.toLowerCase() === "docx") {
            const encodedUrl = encodeURIComponent(url);
            window.open(
                encodedUrl,
                "_blank"
            );
        }

        else {
            const encodedUrl = encodeURIComponent(url);
            window.open(
                encodedUrl,
                "_blank"
            );
        }
    };

    const handleDownload = (url: string, fileName?: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="bg-white dark:bg-[#1A1B20] rounded-xl shadow-sm border border-gray-200 dark:border-transparent p-4 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#1556D41A] w-11 h-11 rounded-full flex items-center justify-center">
                    {
                        index === 2 ? <Icon name="glob" className="text-blue-500" /> : <Icon name="training" className="text-blue-500" />
                    }
                </div>
                <div>
                    <h3 className="text-base font-medium text-[#1D2530] dark:text-white">
                        {data?.title}
                    </h3>
                    <p className="text-xs text-gray-400">{type} Format</p>
                </div>
            </div>
            <div className="flex gap-2 mt-auto sm:flex-row flex-col">
                {type?.toLowerCase() == "doc" &&
                    <Button onClick={() => handlePreview(type, data?.url)} variant="outline" className="flex-1 !border-[#1556D4] !text-[#1556D4] hover:!text-white white hover:!bg-[#1556D4]" iconLeft={<FaRegEye size={15} />}>
                        Preview
                    </Button>}
                <Button
                    onClick={() => handleDownload(data?.url, data?.title)}
                    variant="outline" className="flex-1 !border-[#1556D4] !text-[#1556D4] hover:!text-white white hover:!bg-[#1556D4]" iconLeft={<MdOutlineFileDownload size={15} />}>
                    Download
                </Button>
            </div>
        </div>
    )
}

export default Card