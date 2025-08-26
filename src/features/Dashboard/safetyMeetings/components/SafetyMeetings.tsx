import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import SearchInput from "../../../searchInput";
import Button from "../../../../components/Button";
import useSearchQuery from "../../../../util/querySearch";
import NewSafetyModalForm from "../../../../components/modal/NewSafetyModal";
import { useState } from "react";
import DeleteModal from "../../../../components/modal/DeleteModal";
import { parseJwt } from "../../../../util/jwt";

const SafetyMeetingsComponent = () => {
    const { setFilter } = useSearchQuery();
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | boolean>();
    const payload = parseJwt();
    const role = payload?.role ?? "";

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="mt-5 flex justify-between sm:flex-row flex-col gap-3">
                <div>
                    <div className="text-[28px] font-semibold text-dark-default dark:text-white">
                        Safety Topics
                    </div>
                    <div className="text-[#1D253080] dark:text-[#FFFFFF80] pt-2">
                        Create contextual safety meeting reports from documents or text
                    </div>
                </div>
                {role !== "viewer" &&
                    <Button
                        onClick={() => setOpen(true)}
                        iconLeft={<CiCirclePlus className="text-2xl" />}
                        className="w-fit flex justify-center hover:bg-blue-default/90 duration-150 items-center gap-2 font-medium text-white bg-blue-default h-[52px] rounded-xl"
                    >
                        New Safety Meeting
                    </Button>
                }
            </div>

            {/* Search */}
            <div className="h-[72px] rounded-xl bg-white dark:bg-[#2C2D34] flex items-center px-4">
                <SearchInput onClick={(value) => setFilter("search", value, { resetFilters: true })}
                    className="w-full !mt-0"
                    placeholder="Search topics by name..."
                    inputClass="dark:placeholder:text-[#FFFFFF80]"
                />
            </div>

            {/* Cards */}
            <div>
                <div className="grid md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl flex gap-1 flex-col"
                        >
                            <Link to="/safety-meetings/preview/1"
                                className="flex flex-col gap-1.5"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="text-xl font-medium text-dark-default dark:text-white">
                                        Falling Debris
                                    </p>
                                    <p className="text-[#1D253080] dark:text-[#FFFFFF80s] text-sm">
                                        Created on 04/08/2025
                                    </p>
                                </div>
                                <div className="text-sm flex">
                                    <span className="text-[#1D253080] dark:text-[#FFFFFF80]">
                                        Created by:
                                    </span>
                                    <span className="text-dark-default dark:text-white">
                                        Henry Anderson
                                    </span>
                                </div>
                                <div className="text-sm flex">
                                    <span className="text-[#1D253080] dark:text-[#FFFFFF80]">
                                        Created by:
                                    </span>
                                    <span className="text-dark-default dark:text-white">
                                        Henry Anderson
                                    </span>
                                </div>
                                <div className="text-sm flex">
                                    <span className="text-[#1D253080] dark:text-[#FFFFFF80]">
                                        Created by:
                                    </span>
                                    <span className="text-dark-default dark:text-white">
                                        Henry Anderson
                                    </span>
                                </div>
                            </Link>
                            <div className="flex items-center justify-between mt-4 gap-3">
                                {
                                    role == "viewer" ?
                                        <Button className="!text-sm h-9 flex-1">View Generated Reports</Button>
                                        :
                                        <>
                                            <Button className="!text-sm h-9 flex-1">Add Signed Document</Button>
                                            <Button variant="danger" className="h-9 w-[108px] bg-transparent !text-red-default" onClick={() => setDeleteId(idx + 1)}>
                                                Delete
                                            </Button>
                                        </>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <NewSafetyModalForm
                open={open}
                setOpen={setOpen}
                onConfirm={(data) => onSubmit(data)}
            />
            <DeleteModal open={deleteId} setOpen={setDeleteId}
                onConfirm={() => setDeleteId(false)}
            />
        </div>
    );
};

export default SafetyMeetingsComponent;
