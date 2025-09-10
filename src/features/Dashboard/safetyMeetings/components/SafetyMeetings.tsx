import { Link, useNavigate } from "react-router-dom";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import SearchInput from "@/components/searchInput";
import Button from "@/components/Button";
import useSearchQuery from "@/util/querySearch";
import NewSafetyModalForm from "@/components/modal/NewSafetyModal";
import { useRef, useState } from "react";
import DeleteModal from "@/components/modal/DeleteModal";
import { useAppContext } from "@/context/AppContext";
import { useDeleteTopic, useGetData, useUpdateSafety } from "@/hooks/useSafetyMeeting";
import NotFound from "@/components/Notfound";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { formErrorToast } from "@/util/formErrorToast";
import type { NewSafetyModalFormValues } from "@/features/auth/schemas/authSchema";
import Pagination from "@/components/Pagination";
import { useTranslation } from "react-i18next";

const SafetyMeetingsComponent = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const { user } = useAppContext();;
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | boolean | any>();
    const role = user?.profile?.role.toLowerCase();
    const [isEdit, setIsEdit] = useState<any>();
    const modalRef = useRef<any>(null);
    const { setFilter, queryString, page, goToPage } = useSearchQuery()
    const { data, isLoading, error, isFetching, isError } = useGetData(queryString)
    const { mutateAsync: updateSafety, isPending } = useUpdateSafety()
    const { mutateAsync: deleteTopic, isPending: isDeleting } = useDeleteTopic();

    const handleClick = (e: any, id: number, isRouting: boolean = false) => {
        e.preventDefault();
        e.stopPropagation();
        if (isRouting) {
            navigate(`/safety-meetings/preview/${id}`)
        } else {
            setIsEdit(id)
        }
    }

    const update = (data: NewSafetyModalFormValues) => {
        const formData = new FormData();
        formData.append("title", data.title ?? "")
        formData.append("date", data?.date)
        formData.append("project_name", data?.project_name)
        formData.append("address", data?.address)

        updateSafety({ id: isEdit, data: formData }, {
            onSuccess(data) {
                toast.success("Successfully updated!")
                modalRef.current?.cancel()
                setIsEdit(false)
            },
            onError(error) {
                formErrorToast(error)
            },
        })
    }

    const confirm = (id: number) => {
        deleteTopic(id, {
            onSuccess(data) {
                toast.success('Member deleted successfully');
                setDeleteId(false)
                setOpen(false);
            },
            onError(error) {
                formErrorToast(error)
            },
        })
    }

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="mt-5 flex justify-between sm:flex-row flex-col gap-3">
                <div>
                    <div className="text-[28px] font-semibold text-dark-default dark:text-white">
                        {t("safetyTopics")}
                    </div>
                    <div className="text-[#1D253080] dark:text-[#FFFFFF80] pt-2">
                        {t("generateSafetyTopics")}
                    </div>
                </div>
                {role !== "viewer" &&
                    <Button
                        onClick={() => setOpen(true)}
                        iconLeft={<CiCirclePlus className="text-2xl" />}
                        className="w-fit flex justify-center hover:bg-blue-default/90 duration-150 items-center gap-2 font-medium text-white bg-blue-default sm:h-[52px] rounded-xl ms-auto"
                    >
                        {t("newSafetyMeeting")}
                    </Button>
                }
            </div>

            {/* Search */}
            <div className="h-[72px] rounded-xl bg-white dark:bg-[#2C2D34] flex items-center px-4">
                <SearchInput onClick={(value) => setFilter("search", value, { resetFilters: true })}
                    className="w-full !mt-0"
                    placeholder={`${t('searchByTopic')}...`}
                    inputClass="dark:placeholder:text-[#FFFFFF80]"
                    disabled={isFetching}
                    delay={700}
                    onChange={(value) => setFilter('search', value, { resetFilters: true })}
                />
            </div>

            {/* Cards */}
            <div>
                {isLoading || isFetching ? <div className="col-span-12 text-center"><Spinner /></div> :
                    // @ts-ignore
                    isError ? <div className="col-span-12 text-center bg-red-200 py-3 rounded-lg text-dark-default text-sm">{error?.response?.data?.message}</div> :
                        !data?.results?.length ?
                            <NotFound
                                message="Data not found!"
                            /> :

                            <div className="grid md:grid-cols-3 gap-4">
                                {data?.results?.map((folder: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl flex gap-1 flex-col"
                                    >
                                        <Link
                                            onClick={(e) => handleClick(e, folder?.id, true)}
                                            to={`/safety-meetings/preview/${folder?.id}`}
                                            className="flex flex-col gap-1.5 capitalize"
                                        >
                                            <div className="flex justify-between sm:items-center sm:flex-row flex-col gap-2">
                                                <p className="text-xl font-medium text-dark-default dark:text-white flex items-center">
                                                    {folder?.topic_name?.slice(0, 12) || "N/A"} {folder?.topic_name?.length > 12 ? "..." : ""}
                                                    {role !== "viewer" && <CiEdit size={20} title="Edit" className="cursor-pointer w-10" onClick={(e) => handleClick(e, folder?.id)} />}
                                                </p>
                                                <p className="text-[#1D253080] dark:text-[#FFFFFF80s] text-sm">
                                                    Created on  {folder?.date || "N/A"}
                                                </p>
                                            </div>
                                            <div className="text-sm flex gap-1">
                                                <span className="text-[#1D253080] dark:text-[#FFFFFF80]">
                                                    Project name:
                                                </span>
                                                <span className="text-dark-default dark:text-white">
                                                    {folder?.project_name || "N/A"}
                                                </span>
                                            </div>
                                            <div className="text-sm flex gap-1">
                                                <span className="text-[#1D253080] dark:text-[#FFFFFF80]">
                                                    Job Site Address:
                                                </span>
                                                <span className="text-dark-default dark:text-white">
                                                    {folder?.job_site || "N/A"}
                                                </span>
                                            </div>
                                            <div className="text-sm flex gap-1">
                                                <span className="text-[#1D253080] dark:text-[#FFFFFF80]">
                                                    Created by:
                                                </span>
                                                <span className="text-dark-default dark:text-white">
                                                    {folder?.created_by || "N/A"}
                                                </span>
                                            </div>
                                        </Link>
                                        <div className="flex items-center justify-between mt-4 gap-3 sm:flex-row flex-col">
                                            {
                                                role === "viewer" ?
                                                    <Button className="!text-sm h-9 flex-1 sm:w-auto w-full">View Generated Reports</Button>
                                                    :
                                                    <>
                                                        <Button as="a" href={`/signed-documents/${folder?.id}`} className="!text-sm h-9 flex-1 sm:w-auto w-full">Add Signed Document</Button>
                                                        <Button variant="danger" className="h-9 sm:w-[108px] bg-transparent !text-red-default w-full" onClick={() => setDeleteId(idx + 1)}>
                                                            Delete
                                                        </Button>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                }
            </div>

            {data?.count > 20 &&
                <div className="flex justify-center">
                    <Pagination
                        currentPage={page}
                        totalPages={Math.ceil((data?.count ?? 0) / 20)}
                        goToPage={goToPage}
                    />
                </div>
            }


            <NewSafetyModalForm
                open={open}
                setOpen={setOpen}
            />
            <NewSafetyModalForm
                ref={modalRef}
                open={isEdit}
                setOpen={setIsEdit}
                onConfirm={(data: any) => update(data)}
                loading={isPending}
            />
            <DeleteModal
                open={deleteId}
                setOpen={setDeleteId}
                onClose={() => { }}
                onConfirm={(id) => confirm(id as number)}
                loading={isDeleting}

            />
        </div>
    );
};

export default SafetyMeetingsComponent;
