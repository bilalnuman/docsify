import Button from '@/components/Button'
import Icon from '@/components/Icon';
import NotFound from '@/components/Notfound';
import { FiCheckCircle } from 'react-icons/fi'
import { IoCameraOutline } from 'react-icons/io5';
import { MdOutlineFileUpload } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import useFilePicker from "@/hooks/useFilePicker";
import { useCreateTopicGenerations } from '@/hooks/useSafetyMeeting';
import { toast } from 'react-toastify';
import { formErrorToast } from '@/util/formErrorToast';
import Card from '@/features/Dashboard/training/Card';
import { useAppContext } from '@/context/AppContext';
const SignedDocuments = () => {
    const { user } = useAppContext();
    const { id: idParam } = useParams<{ id?: string }>();
    const id = idParam ? Number(idParam) : NaN;
    const { mutateAsync: createTopicGeneration, isPending, data: fileData } = useCreateTopicGenerations()
    const role = user?.profile?.role.toLowerCase();
    if (!idParam || Number.isNaN(id)) {
        return <NotFound message="Invalid folder ID." />;
    }

    const picker = useFilePicker({
        accept: "image/*,.pdf",
        maxFiles: 5,
        maxFileSize: 10 * 1024 * 1024,
        maxTotalSize: 50 * 1024 * 1024,
        multiple: false,
        classes: {
            dragArea: {
                zone: "relative !p-0 w-full border-none",
                title: "hidden",
                subtitle: "hidden",
            },
            files: { item: "mt-2" },

        },
        onError: (m) => console.warn(m),
    });

    const handleTopicGeneration = () => {
        const formData = new FormData();
        formData.append("uploaded_file", picker.selected || "");
        formData.append("input_type", "pdf");
        createTopicGeneration(formData, {
            onSuccess() {
                toast.success("Training Generated Successfully")
                picker.clear()
            },
            onError(error) {
                formErrorToast(error)
            },
        })

    }

    const source = fileData?.data

    return (
        <div>
            <div className='flex items-center justify-between mt-4'>
                <div className="text-[28px] font-semibold text-dark-default dark:text-white">
                    Falling Debris
                </div>
                {
                    role !== "viewer" &&

                    <Button
                        variant='danger'
                        className="!bg-transparent !text-[#DF3232] hover:!bg-[#DF3232]"
                    >
                        Delete
                    </Button>
                }
            </div>
            {/* cards */}
            {picker?.fileUrl && fileData?.status ? <NotFound
                message="Data not found!"
                buttonText="Reload"
                showHomeButton={false}
            /> : source &&
            <div className='rounded-2xl border border-slate-200 p-4 bg-[#FBFBFB] dark:bg-[#2C2D34] dark:border-white/10'>
                <div className="flex items-center text-xl text-[#1D2530] dark:text-white font-medium gap-1 pb-4">
                    <FiCheckCircle />
                    Safety Meeting Generated
                </div>
                <div className="grid grid-cols-3 gap-5">
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
                <div className='text-[#1D253080] text-sm pt-10'>Generated on {source?.date}</div>
            </div>}
            {/*end of cards */}

            {/* Uploaded Document */}
            <div className="bg-[#FBFBFB] dark:bg-[#2C2D34] p-4 rounded-xl mt-5">
                <div className="flex items-center text-xl text-[#1D2530] dark:text-white font-medium gap-1 pb-4">
                    <MdOutlineFileUpload />
                    Upload Signed Safety Meeting
                </div>


                <div className="flex justify-center bg-white items-center flex-col gap-3 w-full dark:bg-[#1A1B20] py-10 rounded-xl border border-dashed dark:border-transparent">
                    <picker.DragAndDropArea>
                        <div className=' relative z-[9999] flex flex-col gap-3'>
                            <Button type='button' variant="outline" className="w-[250px] hover:!border-[#1556D4] hover:text-white pointer-events-none hover:bg-gray-200 !text-[#1556D4]" iconLeft={<MdOutlineFileUpload size={15} />}>
                                Upload Signed Document
                            </Button>
                            <Button variant="outline" className=" pointer-events-none hover:!bg-[#1556D4] hover:text-white hover:!border-[#1556D4] !text-[#1556D4]" iconLeft={<IoCameraOutline size={15} />}>
                                Photograph Signed Document
                            </Button>
                        </div>
                    </picker.DragAndDropArea>

                </div>

                {picker.fileUrl &&
                    <>
                        <picker.RenderFiles />
                        <Button loading={isPending} className="w-full mt-5 h-11" iconLeft={<Icon name="training" />}
                            onClick={handleTopicGeneration}>Generate Training Materials
                        </Button>
                    </>
                }
            </div>
        </div >
    )
}

export default SignedDocuments















{/* <div className="grid grid-cols-3 gap-5">
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
                                        <label htmlFor='file'>
                                            <input id='file' type="file" className='hidden' />
                                            fsdffdfdsfds
                                        </label>

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
                        </p> */}