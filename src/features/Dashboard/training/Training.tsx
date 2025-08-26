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

const pageRoutes = {
    0: "training/falling-debris",
};

const TrainingComponent = () => {
    const { setFilter } = useSearchQuery()
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const { data: training, isLoading, isError, error } = useTrainingGenerations()
    const payload = parseJwt();
    const role = payload?.role ?? "";

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="mt-5 flex justify-between flex-wrap gap-3">
                <div>
                    <div className="text-[28px] font-semibold text-dark-default dark:text-white">
                        Training
                    </div>
                    <div className="text-[#1D253080] dark:text-[#FFFFFF80] pt-2">
                        Create contextual safety meeting reports from documents or text
                    </div>
                </div>
                {
                    role !== "viewer" &&

                    <Button
                        onClick={() => setOpenForm(true)}
                        className="flex justify-center hover:bg-blue-default/90 duration-150 
                     items-center gap-2 font-medium text-white bg-blue-default 
                     h-[52px] rounded-xl"
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
                    placeholder="Search topics by name..."
                    inputClass="placeholder:dark:text-[#FFFFFF80]"
                    onClick={(value) => setFilter('search', value, { resetFilters: true })}
                />
            </div>

            {/* Cards */}
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading ? <div className="col-span-12 text-center"><Spinner /></div> :
                        isError ? <div className="col-span-12 text-center bg-red-200 py-3 rounded-lg text-dark-default text-sm">{error.message}</div> :
                            !training?.length ? <div className="text-sm font-semibold text-dark-default dark:text-white text-center col-span-12">Training not found</div> :
                                Array.from({ length: 6 }).map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl flex gap-3 flex-col 
                         shadow-sm dark:border dark:border-white/10"
                                    >
                                        <Link
                                            // @ts-ignore
                                            to={`/${pageRoutes[idx] || ""}`}
                                            className="flex gap-3 flex-col"
                                        >
                                            <div className="flex justify-between flex-wrap">
                                                <p className="text-xl font-medium text-dark-default dark:text-white">
                                                    Falling Debris
                                                </p>
                                                <p className="text-[#1D253080] dark:text-[#FFFFFF80] text-sm">
                                                    Created on 04/08/2025
                                                </p>
                                            </div>
                                            <div className="text-sm flex gap-1 flex-wrap">
                                                <span className="text-[#1D253080] dark:text-[#FFFFFF80]">
                                                    Created by:
                                                </span>
                                                <span className="text-dark-default dark:text-white">
                                                    Henry Anderson
                                                </span>
                                            </div>
                                        </Link>
                                        {role !== "viewer" ?

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

            {/* Modals */}
            <NewTrainingDetailsModal
                open={openForm}
                setOpen={setOpenForm}
            />
            <DeleteModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default TrainingComponent;
