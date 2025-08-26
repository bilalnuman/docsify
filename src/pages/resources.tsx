import Icon from "../components/Icon";
import SearchInput from "../features/searchInput";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import useSearchQuery from "../util/querySearch";
import { parseJwt } from "../util/jwt";
import Button from "../components/Button";
import { useResources } from "../hooks/useResource";
import { formErrorToast } from "../util/formErrorToast";

interface FolderTypes {
    id: number;
    name: string;
    description: string;
    category: string;
    tags: string;
    required_role: 'viewer' | 'editor' | 'admin' | string;
    created_at: string;
    file_count: number;
    total_size: number;
}


const Resources = () => {
    const { data: resources, isLoading, isError, error } = useResources();
    const { setFilter, params, groupedQueries } = useSearchQuery()
    const payload = parseJwt();
    const role = payload?.role ?? "";
    if (isError) {
        formErrorToast(error)
    }


    return (
        <div className="flex flex-col gap-5 pt-5">
            {/* Header */}
            <div className="flex items-center sm:justify-between sm:flex-row flex-col">
                <div>
                    <div className="text-[28px] font-semibold text-dark-default dark:text-white">
                        Resources Library
                    </div>
                    <div className="text-[#1D253080] dark:text-[#FFFFFF80] pt-2">
                        Access 140+ fillable safety and compliance documents
                    </div>
                </div>
                <div className="text-sm ms-auto font-medium text-dark-default dark:text-white rounded-full border border-[#1D253026] dark:border-gray-700 px-3 py-2 flex items-center gap-[6px]">
                    <Icon name="training" className="text-[10px]" />3/140 Available
                </div>
            </div>


            {role === "admin" &&
                <div
                    className="w-full rounded-xl bg-white dark:bg-[#2C2D34] px-4 py-3 md:px-5 md:py-4 border border-transparent dark:border-gray-700"
                    style={{ boxShadow: "#1556D4 0px 0px 5px" }}
                >
                    <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <div className="text-[15px] font-semibold text-slate-800 dark:text-white">
                                Limited Access
                            </div>
                            <p className="text-sm text-slate-500 dark:text-[#FFFFFF80] truncate">
                                Your trial plan includes access to 3 compliance documents
                            </p>
                        </div>
                        <Button as="a" href="/subscription"
                            type="button"
                            className="h-[52px]"
                        >
                            Upgrade To Full Access
                        </Button >
                    </div>
                </div>}

            {/* Search */}
            <div className="h-[72px] rounded-xl bg-white dark:bg-[#2C2D34] flex items-center px-4 border border-transparent dark:border-gray-700">
                <SearchInput
                    className="border-none w-full !mt-0"
                    placeholder="Search topics by name..."
                    inputClass="dark:placeholder:text-white/50"
                    onChange={(value) => setFilter("search", value, { isMultiple: false })}
                />
            </div>


            {isLoading ? (
                <Spinner />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {!resources?.results?.length ? <div className="text-center col-span-12 dark:text-white">Data not found!</div> :
                        resources?.results?.map((folder: FolderTypes, idx: number) => (
                            <div
                                key={idx}
                                className="rounded-xl bg-white dark:bg-[#2C2D34] border border-gray-200 dark:border-gray-700 p-4"
                            >
                                <div>
                                    <Icon name="training" className="w-5 h-5 text-[#1556D4]" />
                                </div>
                                <h3 className="mt-3 font-semibold text-dark-default dark:text-white">
                                    {folder?.name}
                                </h3>
                                <p className="text-sm text-[#1D253080] dark:text-[#FFFFFF80]">
                                    {folder?.description}
                                </p>
                                <Link
                                    to={`/resources/${folder?.id}`}
                                    className="w-full px-4 py-2 border border-[#1556D4] text-center hover:bg-[#1556D4]/90 mt-3 text-white block bg-[#1556D4] rounded-lg text-sm font-medium transition"
                                >
                                    View Files
                                </Link>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Resources;
