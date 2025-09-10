import { Link, useNavigate } from "react-router-dom";
import SearchInput from "@/components/searchInput";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import DeleteModal from "@/components/modal/DeleteModal";
import { useRef, useState } from "react";
import Button from "@/components/Button";
import useSearchQuery from "@/util/querySearch";
import { useTrainingGenerations, useUpdateTrainingGeneration } from "@/hooks/useTraining";
import Spinner from "@/components/Spinner";
import NotFound from "@/components/Notfound";
import NewTrainingDetailsModal, { type NewTrainingDetailsModalHandle } from "@/components/modal/NewTrainingDetailsModal";
import Pagination from "@/components/Pagination";
import { formErrorToast } from "@/util/formErrorToast";
import { toast } from "react-toastify";
import { useAppContext } from "@/context/AppContext";
import { useTranslation } from "react-i18next";

const pageRoutes = {
    0: "training/falling-debris",
};

const TrainingComponent = () => {
    const{t}=useTranslation()
    const { user } = useAppContext();
    const navigate = useNavigate();
    const { setFilter, queryString, goToPage, page } = useSearchQuery()
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [isEdit, setIsEdit] = useState<any>();
    const modalRef = useRef<NewTrainingDetailsModalHandle>(null);
    const { data: trainingData, isLoading, isError, error, isFetching } = useTrainingGenerations(queryString, 20)
    const { mutateAsync: updateTraining, isPending } = useUpdateTrainingGeneration()

    const role = user?.profile?.role.toLowerCase();

    const handleClick = (e: any, id: number, isRouting: boolean = false) => {
        e.preventDefault();
        e.stopPropagation();
        if (isRouting) {
            navigate(`/training/folder/${id}`)
        } else {
            setIsEdit(id)

        }
    }


    const update = (data: any) => {
        const formData = new FormData();
        formData.append("title", data.title ?? "")
        formData.append("date", data?.date)
        updateTraining({ id: isEdit, data: formData }, {
            onSuccess(data) {
                toast.success("Successfully updated!")
                modalRef.current?.cancel()
                setIsEdit("")
            },
            onError(error) {
                formErrorToast(error)
            },
        })
    }


    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="mt-5 flex justify-between flex-wrap gap-3">
                <div>
                    <div className="text-[28px] font-semibold text-dark-default dark:text-white">
                       {t("toolEquipmentTraining")}
                    </div>
                    <div className="text-[#1D253080] dark:text-[#FFFFFF80] pt-2">
                        {t("uploadToolManual")}
                    </div>
                </div>
                {
                    role !== "viewer" &&

                    <Button
                        onClick={() => setOpenForm(true)}
                        className="flex justify-center hover:bg-blue-default/90 duration-150 
                     items-center gap-2 font-medium text-white bg-blue-default 
                     sm:h-[52px] rounded-xl ms-auto"
                        iconLeft={<CiCirclePlus className="text-2xl" />}
                    >
                        {t("newTraining")}
                    </Button>
                }
            </div>

            {/* Search */}
            <div className="h-[72px] rounded-xl bg-white dark:bg-[#2C2D34] flex items-center px-4 shadow-sm dark:border dark:border-white/10">
                <SearchInput
                    className="w-full !mt-0"
                    placeholder={`${t('searchByTool')}...`}
                    inputClass="placeholder:dark:text-[#FFFFFF80]"
                    disabled={isFetching}
                    delay={700}
                    onChange={(value) => setFilter('search', value, { resetFilters: true })}
                />
            </div>

            {/* Cards */}
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading || isFetching ? <div className="col-span-12 text-center"><Spinner /></div> :
                        // @ts-ignore
                        isError ? <div className="col-span-12 text-center bg-red-200 py-3 rounded-lg text-dark-default text-sm">{error?.response?.data?.message}</div> :
                            !trainingData?.results?.length ?
                                <NotFound
                                    message="Data not found!"
                                />
                                :
                                trainingData?.results?.map((folder: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl flex gap-3 flex-col 
                         shadow-sm dark:border dark:border-white/10"
                                    >
                                        <Link
                                            // @ts-ignore
                                            onClick={(e) => handleClick(e, folder?.id, true)}
                                            to={`/training/folder/${folder?.id}`}
                                            className="flex gap-3 flex-col"
                                        >
                                            <div className="flex justify-between items-center flex-wrap">
                                                <p className="text-xl flex items-center font-medium text-dark-default dark:text-white">
                                                   <p> {folder?.title?.slice(0,12)} {folder?.title?.length>12?"...":""}</p>
                                                    {role !=='viewer'&&<CiEdit size={20} title="Edit" className="cursor-pointer w-10" onClick={(e) => handleClick(e, folder?.id)} />}
                                                </p>
                                                <p className="text-[#1D253080] dark:text-[#FFFFFF80] text-sm">
                                                    Created on {folder?.date}
                                                </p>
                                            </div>
                                            <div className="text-sm flex gap-1 flex-wrap">
                                                <span className="text-[#1D253080] dark:text-[#FFFFFF80]">
                                                    Created by:
                                                </span>
                                                <span className="text-dark-default dark:text-white">
                                                    {folder?.created_by}
                                                </span>
                                            </div>
                                        </Link>
                                        {role === "viewer" ?

                                            <Button
                                                // @ts-ignore
                                                onClick={() => router(`/${pageRoutes[idx]}`)}
                                            >
                                                View Training Reports
                                            </Button>
                                            :
                                            <Button
                                                variant="danger"
                                                className="!bg-transparent !text-dark-default dark:!text-gray-200 
                           hover:!bg-red-default hover:!text-white"
                                                onClick={() => setOpen(true)}
                                            >
                                                Delete
                                            </Button>
                                        }
                                    </div>
                                ))}
                </div>
            </div>
            {trainingData?.count > 20 &&
                <div className="flex justify-center">
                    <Pagination
                        currentPage={page}
                        totalPages={Math.ceil((trainingData?.count ?? 0) / 20)}
                        goToPage={goToPage}
                    />
                </div>
            }

            {/* Modals */}
            <NewTrainingDetailsModal
                open={openForm}
                setOpen={setOpenForm}
            />
            <NewTrainingDetailsModal
                ref={modalRef}
                open={isEdit}
                setOpen={setIsEdit}
                onConfirm={(data: any) => update(data)}
                loading={isPending}
            />
            <DeleteModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default TrainingComponent;
