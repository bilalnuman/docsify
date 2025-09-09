import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { isDuplicate, validateFile } from "./utils";

type Dimensions = { width: number; height: number };
type FileMeta = { size?: boolean; name?: boolean; type?: boolean };

interface FileUploaderProps {
  multiple?: boolean;
  allowedTypes?: string[];
  maxFileSizeMB?: number;
  maxDimensions?: Dimensions;
  showProgress?: boolean;
  showPreview?: boolean;
  onFilesChange?: (files: File[]) => void;
  onDbFilesChange?: (urls: string[]) => void;
  dbFileUrls?: string[];
  fileMeta?: FileMeta;
  children?: ReactNode;
  className?: string;
}

export interface FileUploaderHandle {
  reset: () => void;
}

const FileUploader = forwardRef<FileUploaderHandle, FileUploaderProps>(
  (
    {
      multiple = false,
      allowedTypes = [],
      maxFileSizeMB = 5,
      maxDimensions,
      fileMeta,
      showProgress = false,
      showPreview = false,
      onFilesChange,
      onDbFilesChange,
      dbFileUrls = [],
      children,
      className = "",
    },
    ref
  ) => {
    const [files, setFiles] = useState<File[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fmtSize = (size: number) =>
      size < 1024
        ? `${size} bytes`
        : size < 1024 ** 2
          ? `${(size / 1024).toFixed(1)} KB`
          : `${(size / 1024 ** 2).toFixed(2)} MB`;

    const handleFiles = async (incoming: FileList | null) => {
      if (!incoming) return;
      const list = Array.from(incoming);
      const newFiles: File[] = [];

      for (const f of list) {
        if (isDuplicate(files, f)) {
          alert(`File "${f.name}" is already selected.`);
          continue;
        }
        const ok = await validateFile(
          f,
          allowedTypes,
          maxFileSizeMB,
          maxDimensions
        );
        if (ok) newFiles.push(f);
      }

      const updated = multiple ? [...files, ...newFiles] : newFiles.slice(0, 1);
      setFiles(updated);
      onFilesChange?.(updated);
    };

    const removeAt = (i: number) => {
      const updated = [...files];
      updated.splice(i, 1);
      setFiles(updated);
      onFilesChange?.(updated);
    };

    const removeDbFileAt = (i: number) => {
      const updated = [...dbFileUrls];
      updated.splice(i, 1);
      onDbFilesChange?.(updated);
    };

    const renderThumbnail = (file: File | string) => {
      const isURL = typeof file === "string";
      const url = isURL ? file : URL.createObjectURL(file);
      const type = isURL ? "" : (file as File).type;

      const canPreview = !!showPreview;
      const previewClass = canPreview ? "cursor-pointer" : "cursor-default";

      const handlePreview = () => {
        if (canPreview) setPreviewUrl(url);
      };

      if (!isURL && type.startsWith("image/")) {
        return (
          <img
            src={url}
            alt=""
            onClick={handlePreview}
            className={clsx("w-full h-full object-cover rounded", previewClass)}
          />
        );
      }
      if (isURL && url.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
        return (
          <img
            src={url}
            alt=""
            onClick={handlePreview}
            className={clsx("w-full h-full object-cover rounded", previewClass)}
          />
        );
      }
      if (!isURL && type.startsWith("video/")) {
        return (
          <video
            src={url}
            onClick={handlePreview}
            controls
            className={clsx("max-h-24 w-full rounded", previewClass)}
          />
        );
      }
      if (isURL && url.match(/\.(mp4|webm)(\?.*)?$/i)) {
        return (
          <video
            src={url}
            onClick={handlePreview}
            controls
            className={clsx("max-h-24 w-full rounded", previewClass)}
          />
        );
      }
      if (isURL && url.match(/\.pdf(\?.*)?$/i)) {
        return (
          <div className="h-20 flex items-center justify-center text-3xl">📄</div>
        );
      }
      return (
        <div className="h-20 flex items-center justify-center text-3xl">📁</div>
      );
    };

    useImperativeHandle(ref, () => ({
      reset: () => {
        console.log(4343)
        setFiles([]);
        setPreviewUrl(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onFilesChange?.([]);
        onDbFilesChange?.([]);
      },
    }));

    return (
      <>
        <div
          className={clsx(
            "border-2 !bg-white border-dashed border-gray-300 dark:border-white/20 rounded-md p-4 text-center cursor-pointer dark:!bg-[#1A1B20]",
            "transition-colors duration-300 h-full flex items-center justify-center flex-col",
            "hover:bg-gray-100 dark:hover:bg-[#1A1B20]/10",
            className
          )}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            ref={fileInputRef}
            hidden
            multiple={multiple}
            accept={allowedTypes.join(",")}
            onChange={(e) => {
              handleFiles(e.target.files);
              e.currentTarget.value = "";
            }}
          />

          {children ? (
            children
          ) : (
            <p className="text-sm text-gray-600">Drag or click to upload</p>
          )}

          <div
            className={clsx(
              "grid mt-4 w-full gap-1.5 max-h-[200px] overflow-auto",
              "grid-cols-[repeat(auto-fill,minmax(120px,1fr))]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {dbFileUrls.map((url, i) => (
              <div
                key={`db-${i}`}
                className="flex flex-col items-center relative border border-gray-200 rounded-lg p-2 text-center bg-gray-50"
              >
                {renderThumbnail(url)}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDbFileAt(i);
                  }}
                  className={clsx(
                    "absolute top-1 right-1 bg-red-600/80 text-white",
                    "text-[10px] rounded-full min-w-[15px] h-[15px]",
                    "inline-flex items-center justify-center"
                  )}
                >
                  ✕
                </button>
                {showProgress && (
                  <progress value={100} max={100} className="w-full mt-2" />
                )}
              </div>
            ))}

            {showPreview && files.map((f, i) => (
              <div
                key={`file-${i}`}
                className="flex flex-col items-center relative border border-gray-200 rounded-lg p-2 text-center bg-gray-50 "
              >
                {renderThumbnail(f)}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAt(i);
                  }}
                  className={clsx(
                    "absolute top-1 right-1 bg-red-600/80 text-white",
                    "text-[10px] rounded-full min-w-[15px] h-[15px]",
                    "inline-flex items-center justify-center"
                  )}
                >
                  ✕
                </button>

                {fileMeta && (
                  <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                    {fileMeta.name && <div>{f.name}</div>}
                    {fileMeta.type && <div>{f.type || "—"}</div>}
                    {fileMeta.size && <div>{fmtSize(f.size)}</div>}
                  </div>
                )}

                {showProgress && (
                  <progress value={100} max={100} className="w-full mt-2" />
                )}
              </div>
            ))}
          </div>

          {previewUrl && showPreview && (
            <div
              className="fixed inset-0 bg-black/60 flex justify-center items-center z-[999]"
              onClick={(e) => {
                setPreviewUrl(null);
                e.stopPropagation();
              }}
            >
              <div
                className="bg-white p-4 rounded-lg max-w-[90%] max-h-[90%] shadow-2xl text-center"
                onClick={(e) => e.stopPropagation()}
              >
                {previewUrl.match(/\.(mp4|webm)$/) ? (
                  <video
                    src={previewUrl}
                    controls
                    className="max-w-full max-h-[80vh] mx-auto"
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full max-h-[80vh] mx-auto"
                  />
                )}
                <button
                  type="button"
                  className="mt-4 font-bold text-blue-600 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewUrl(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </>
    );
  }
);

FileUploader.displayName = "FileUploader";
export default FileUploader;
