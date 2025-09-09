<<<<<<< HEAD
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
=======
import { Link } from "react-router-dom";
import SearchInput from "../../searchInput";
import { CiCirclePlus } from "react-icons/ci";
import DeleteModal from "../../../components/modal/DeleteModal";
import { useState } from "react";
import Button from "../../../components/Button";
import NewTrainingDetailsModal from "../../../components/modal/NewTrainingDetailsModal";
import useSearchQuery from "../../../util/querySearch";
import { parseJwt } from "../../../util/jwt";
import { useTrainingGenerations } from "../../../hooks/useTraining";
import Spinner from "../../../components/Spinner";
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

const pageRoutes = {
    0: "training/falling-debris",
};

const TrainingComponent = () => {
<<<<<<< HEAD
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

=======
    const { setFilter, params } = useSearchQuery()
    const query = params.get("search") ? `?${params.get("search")}` : "";
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const { data: training, isLoading, isError, error,isFetching } = useTrainingGenerations(query)
    const payload = parseJwt();
    const role = payload?.role ?? "";
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="mt-5 flex justify-between flex-wrap gap-3">
                <div>
                    <div className="text-[28px] font-semibold text-dark-default dark:text-white">
<<<<<<< HEAD
                        Tool & Equipment Training
                    </div>
                    <div className="text-[#1D253080] dark:text-[#FFFFFF80] pt-2">
                        Upload a tool or equipment manual to generate training
=======
                        Training
                    </div>
                    <div className="text-[#1D253080] dark:text-[#FFFFFF80] pt-2">
                        Create contextual safety meeting reports from documents or text
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                    </div>
                </div>
                {
                    role !== "viewer" &&

                    <Button
                        onClick={() => setOpenForm(true)}
                        className="flex justify-center hover:bg-blue-default/90 duration-150 
                     items-center gap-2 font-medium text-white bg-blue-default 
<<<<<<< HEAD
                     sm:h-[52px] rounded-xl ms-auto"
=======
                     h-[52px] rounded-xl"
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                        iconLeft={<CiCirclePlus className="text-2xl" />}
                    >
                        New Training
                    </Button>
                }
            </div>

            {/* Search */}
            <div className="h-[72px] rounded-xl bg-white dark:bg-[#2C2D34] flex items-center px-4 shadow-sm dark:border dark:border-white/10">
                <SearchInput
                    className="w-full !mt-0"
<<<<<<< HEAD
                    placeholder="Search by tool or equipment name..."
                    inputClass="placeholder:dark:text-[#FFFFFF80]"
                    disabled={isFetching}
                    delay={700}
=======
                    placeholder="Search topics by name..."
                    inputClass="placeholder:dark:text-[#FFFFFF80]"
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                    onChange={(value) => setFilter('search', value, { resetFilters: true })}
                />
            </div>

            {/* Cards */}
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading || isFetching ? <div className="col-span-12 text-center"><Spinner /></div> :
<<<<<<< HEAD
                        // @ts-ignore
                        isError ? <div className="col-span-12 text-center bg-red-200 py-3 rounded-lg text-dark-default text-sm">{error?.response?.data?.message}</div> :
                            !trainingData?.results?.length ?
                                <NotFound
                                    message="Data not found!"
                                />
                                :
                                trainingData?.results?.map((folder: any, idx: number) => (
=======
                    // @ts-ignore
                        isError ? <div className="col-span-12 text-center bg-red-200 py-3 rounded-lg text-dark-default text-sm">{error?.response?.data?.message}</div> :
                            !training?.length ? <div className="text-sm font-semibold text-dark-default dark:text-white text-center col-span-12">Training not found</div> :
                                Array.from({ length: 6 }).map((stat, idx) => (
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                                    <div
                                        key={idx}
                                        className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl flex gap-3 flex-col 
                         shadow-sm dark:border dark:border-white/10"
                                    >
                                        <Link
                                            // @ts-ignore
<<<<<<< HEAD
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
=======
                                            to={`/${pageRoutes[idx] || ""}`}
                                            className="flex gap-3 flex-col"
                                        >
                                            <div className="flex justify-between flex-wrap">
                                                <p className="text-xl font-medium text-dark-default dark:text-white">
                                                    Falling Debris
                                                </p>
                                                <p className="text-[#1D253080] dark:text-[#FFFFFF80] text-sm">
                                                    Created on 04/08/2025
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                                                </p>
                                            </div>
                                            <div className="text-sm flex gap-1 flex-wrap">
                                                <span className="text-[#1D253080] dark:text-[#FFFFFF80]">
                                                    Created by:
                                                </span>
                                                <span className="text-dark-default dark:text-white">
<<<<<<< HEAD
                                                    {folder?.created_by}
                                                </span>
                                            </div>
                                        </Link>
                                        {role === "viewer" ?
=======
                                                    Henry Anderson
                                                </span>
                                            </div>
                                        </Link>
                                        {role !== "viewer" ?
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

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
<<<<<<< HEAD
            {trainingData?.count > 20 &&
                <div className="flex justify-center">
                    <Pagination
                        currentPage={page}
                        totalPages={Math.ceil((trainingData?.count ?? 0) / 20)}
                        goToPage={goToPage}
                    />
                </div>
            }
=======
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

            {/* Modals */}
            <NewTrainingDetailsModal
                open={openForm}
                setOpen={setOpenForm}
            />
<<<<<<< HEAD
            <NewTrainingDetailsModal
                ref={modalRef}
                open={isEdit}
                setOpen={setIsEdit}
                onConfirm={(data: any) => update(data)}
                loading={isPending}
            />
=======
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
            <DeleteModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default TrainingComponent;
