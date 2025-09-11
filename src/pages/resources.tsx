import Icon from "../components/Icon";
import SearchInput from "@/components/searchInput";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import useSearchQuery from "@/util/querySearch";
import { parseJwt } from "@/util/jwt";
import Button from "@/components/Button";
import { useFolders, useResources } from "@/hooks/useResource";
import { formErrorToast } from "@/util/formErrorToast";
import Pagination from "@/components/Pagination";
import { useTranslation } from "react-i18next";

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
    const{t}=useTranslation()
    const { setFilter, queryString, page, goToPage } = useSearchQuery()
    const { data: resources, isLoading, isError, error } = useFolders(queryString, 20);
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
                        {t("resourcesLibrary")}
                    </div>
                    <div className="text-[#1D253080] dark:text-[#FFFFFF80] pt-2">
                        {t("access")} 140+ {t("fillableDocuments")}
                    </div>
                </div>
                <div className="text-sm ms-auto sm:mt-0 mt-3 font-medium text-dark-default dark:text-white rounded-full border border-[#1D253026] dark:border-gray-700 px-3 py-2 flex items-center gap-[6px]">
                    <Icon name="training" className="text-[10px]" />3/140 {t("available")}
                </div>
            </div>


            {role === "admin" &&
                <div
                    className="w-full rounded-xl bg-white dark:bg-[#2C2D34] px-4 py-3 md:px-5 md:py-4 border border-transparent dark:border-gray-700"
                    style={{ boxShadow: "#1556D4 0px 0px 5px" }}
                >
                    <div className="flex items-center justify-between gap-4 sm:flex-row flex-col">
                        <div className="min-w-0 flex-1">
                            <div className="font-medium text-[#1D2530] dark:text-white">
                              {t("limitedAccess")}
                            </div>
                            <p className="text-sm text-slate-500 dark:text-[#FFFFFF80]">
                               {t("trialPlanIncludes")}
                            </p>
                        </div>
                        <Button as="a" href="/subscription"
                            type="button"
                            className="h-[52px]"
                        >
                            {t("upgradeToFullAccess")}
                        </Button >
                    </div>
                </div>}

            {/* Search */}
            <div className="h-[72px] rounded-xl bg-white dark:bg-[#2C2D34] flex items-center px-4 border border-transparent dark:border-gray-700">
                <SearchInput
                    disabled={isLoading}
                    className="border-none w-full !mt-0"
                    placeholder={`${t("searchTopicsByName")}...`}
                    inputClass="dark:placeholder:text-white/50"
                    onChange={(value) => setFilter("search", value, { isMultiple: false })}
                />
            </div>


            {isLoading ? (
                <Spinner />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {!resources?.results?.length ? <div className="col-span-12 py-4 text-center dark:text-white text-[#1D2530] text-sm font-semibold">Resources not found!</div> :
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
                                   {t("viewFiles")}
                                </Link>
                            </div>
                        ))}
                </div>
            )}
            {resources?.count > 20 &&
                <div className="flex justify-center">
                    <Pagination
                        currentPage={page}
                        totalPages={Math.ceil((resources?.count ?? 0) / 20)}
                        goToPage={goToPage}
                    />
                </div>
            }
        </div>
    );
};

export default Resources;
