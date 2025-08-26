import { useEffect, useMemo, useState } from "react";
import Icon from "../components/Icon";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import SearchInput from "../features/searchInput";
import { useApi } from "../features/auth/services/authService";
import useSearchQuery from "../util/querySearch";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { parseJwt } from "../util/jwt";
import Button from "../components/Button";

interface ResourceFiles {
    id: number;
    name: string;
    description: string;
    file: string;
    file_url: string;
    file_size: number;
    tags: string;
    is_active: boolean;
    order: number;
    created_at: string;
    folder: number;
}

const isPreviewable = (url: string) => {
    const lower = url.split("?")[0].toLowerCase();
    return (
        lower.endsWith(".pdf") ||
        lower.endsWith(".png") ||
        lower.endsWith(".jpg") ||
        lower.endsWith(".jpeg") ||
        lower.endsWith(".webp") ||
        lower.endsWith(".gif") ||
        lower.endsWith(".txt")
    );
};

const formatBytes = (bytes?: number) => {
    if (bytes == null) return "";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
};

/** Try to derive a sensible filename (fallbacks if header absent) */
const getFilename = (url: string, contentDisposition?: string | null) => {
    // Content-Disposition first
    if (contentDisposition) {
        const m = /filename\*=UTF-8''([^;]+)|filename="?([^"]+)"?/i.exec(contentDisposition);
        const fromHeader = decodeURIComponent(m?.[1] || m?.[2] || "");
        if (fromHeader) return fromHeader;
    }
    // URL path
    const base = url.split("#")[0].split("?")[0];
    const last = base.substring(base.lastIndexOf("/") + 1);
    if (last) return last;
    // Sensible default
    return "download.pdf";
};

const ResourcesPreview = () => {
    const { id } = useParams();
    const { request, loading, data } = useApi();
    const { setFilter, groupedQueries } = useSearchQuery();
    const payload = parseJwt();                    // may be null
    const role = payload?.role ?? "";

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    const getResourceFolderFiles = async (quer = "") => {
        await request({
            endpoint: `v1/folders/${id}?${quer ?? ""}`,
            method: "GET",
        });
    };

    useEffect(() => {
        getResourceFolderFiles(groupedQueries?.search);
    }, [groupedQueries?.search, id]);

    const files: ResourceFiles[] = useMemo(
        () => (data?.files ?? []) as ResourceFiles[],
        [data]
    );

    const openPreview = (file: ResourceFiles) => {
        const url = file.file_url || file.file;
        if (!url) return;
        if (isPreviewable(url)) setPreviewUrl(url);
        else window.open(url, "_blank", "noopener,noreferrer");
    };


    const forceDownload = async (file: ResourceFiles) => {
        const url = file.file_url || file.file;
        if (!url) return;

        try {
            const link = document.createElement("a");
            link.href = file.file_url;
            link.download = "invoice.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {

        } finally {

        }
    };

    return (
        <div className="flex flex-col gap-5 pt-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-[28px] font-semibold text-dark-default dark:text-white">
                        Resources Library
                    </div>
                    <div className="text-[#1D253080] dark:text-white/50 pt-2">
                        Access 140+ fillable safety and compliance documents
                    </div>
                </div>
                <div className="text-sm font-medium text-dark-default dark:text-white rounded-full border border-[#1D253026] dark:border-gray-700 px-3 py-2 flex items-center gap-[6px]">
                    <Icon name="training" className="text-[10px]" />3/140 Available
                </div>
            </div>

            {/* Limited Access Card */}
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
                            <p className="text-sm text-slate-500 dark:text-white/50 truncate">
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
                </div>
            }

            {/* Search */}
            <div className="h-[72px] rounded-xl bg-white dark:bg-[#2C2D34] flex items-center px-4 border border-transparent dark:border-gray-700">
                <SearchInput
                    className="w-full !mt-0"
                    placeholder="Search topics by name..."
                    inputClass="dark:placeholder:text-white/50"
                    onChange={(value) => setFilter("search", value, { isMultiple: false })}
                />
            </div>

            {/* Resource List */}
            {loading ? (
                <Spinner />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {!files?.length ? (
                        <div className="text-center col-span-12 dark:text-white">Data not found!</div>
                    ) : (
                        files.map((file: ResourceFiles) => (
                            <div
                                key={file.id}
                                className="rounded-xl bg-white dark:bg-[#2C2D34] border border-gray-200 dark:border-gray-700 p-4"
                            >
                                <div>
                                    <Icon name="training" className="w-5 h-5 text-[#1556D4]" />
                                </div>

                                <h3 className="mt-3 font-semibold text-dark-default dark:text-white">
                                    {file?.name}
                                </h3>

                                <p className="scroll-hidden text-sm text-[#1D253080] dark:text-gray-400 h-[80px] overflow-y-auto scroll-smooth">
                                    {file?.description}
                                </p>

                                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    {formatBytes(file.file_size)}
                                </div>

                                <div className="flex gap-2 mt-4">

                                    <Button onClick={() => openPreview(file)} variant="outline" className="flex-1 !border-[#1556D4] !text-[#1556D4] hover:!text-white hover:!bg-[#1556D4]" iconLeft={<FaRegEye size={15} />}>
                                        Preview
                                    </Button>
                                    <Button onClick={(e) => forceDownload(file)} variant="outline" className="flex-1 !border-[#1556D4] !text-[#1556D4] hover:!text-white hover:!bg-[#1556D4]" iconLeft={<MdOutlineFileDownload size={15} />}>
                                        {downloadingId === file.id ? "Downloading…" : "Download"}
                                    </Button>

                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Preview Modal */}
            {previewUrl && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
                    onClick={() => setPreviewUrl(null)}
                >
                    <div
                        className="w-full max-w-5xl h-[80vh] bg-white dark:bg-[#1f2024] rounded-xl shadow-xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                            <div className="font-medium text-gray-800 dark:text-gray-100">Preview</div>
                            <button
                                className="text-sm px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => setPreviewUrl(null)}
                            >
                                Close
                            </button>
                        </div>

                        <iframe title="File preview" src={previewUrl} className="w-full h-full" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourcesPreview;
