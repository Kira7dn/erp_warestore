"use client";

import { formatFileSize, getDownloadUrl } from "@edgestore/react/utils";
import {
  DownloadIcon,
  LucideFileWarning,
  Trash2Icon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { useEdgeStore } from "@/lib/edgestore";
import { IoDocumentAttachOutline } from "react-icons/io5";
import Link from "next/link";
import clsx from "clsx";

const variants = {
  base: "relative rounded-md p-4 w-full flex justify-center items-center flex-col cursor-pointer border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700 dark:border-gray-600",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

export type FileState = {
  file?: File;
  key: string; // used to identify the file in the progress callback
  url?: string;
  filename?: string;
  progress: "PENDING" | "COMPLETE" | "ERROR" | number;
  abortController?: AbortController;
};

type InputProps = {
  className?: string;
  fileState?: FileState[];
  onChange?: (files: FileState[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: FileState[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file is not supported.";
  },
};

const MultiFileDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, fileState, className, disabled, onFilesAdded, onChange },
    ref,
  ) => {
    const [customError, setCustomError] = React.useState<string>();
    if (dropzoneOptions?.maxFiles && fileState?.length) {
      disabled = disabled ?? fileState.length >= dropzoneOptions.maxFiles;
    }
    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled,
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles;
        // create new Set of keys from fileState and initialValues
        setCustomError(undefined);
        if (
          dropzoneOptions?.maxFiles &&
          files.length + (fileState?.length ?? 0) > dropzoneOptions.maxFiles
        ) {
          setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
          return;
        }
        if (files) {
          const addedFiles = files.map<FileState>((file) => ({
            file,
            key: Math.random().toString(36).slice(2),
            progress: "PENDING",
          }));
          void onFilesAdded?.(addedFiles);
          void onChange?.([...(fileState ?? []), ...addedFiles]);
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    );

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === "file-too-large") {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div className="w-full">
        <div className="flex w-full justify-between gap-2">
          <div className="w-40">
            {/* Main File Input */}
            <div
              {...getRootProps({
                className: dropZoneClassName,
              })}
            >
              <input ref={ref} {...getInputProps()} />
              <div className="flex items-center justify-center gap-2 text-small-semibold text-gray-400">
                <UploadCloudIcon className="mb-1 h-12 w-12" />
                <div className="text-center text-gray-400">
                  drag & drop or click to upload
                </div>
              </div>
            </div>
            {/* Error Text */}
            <div className="mt-1 text-small-medium text-red-500">
              {customError ?? errorMessage}
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-between py-1">
            {fileState?.map(
              ({ key, file, abortController, progress, filename, url }) => {
                return (
                  <div key={key} className="relative w-full">
                    <div className="flex justify-between gap-2">
                      <div className="flex w-full items-center gap-2 text-gray-500 dark:text-white">
                        <IoDocumentAttachOutline
                          size="24"
                          className="shrink-0"
                        />
                        <div className="w-1 flex-1 truncate text-tiny-medium">
                          {filename || file?.name}
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        {url && (
                          <a href={getDownloadUrl(url)}>
                            <DownloadIcon className="h-4 w-4 shrink-0 text-green-500" />
                          </a>
                        )}

                        {progress === "PENDING" || "COMPLETE" ? (
                          <button
                            onClick={() => {
                              void onChange?.(
                                fileState.filter((item) => item.key !== key),
                              );
                            }}
                          >
                            <Trash2Icon className="h-4 w-4 shrink-0 text-gray-500" />
                          </button>
                        ) : progress === "ERROR" ? (
                          <LucideFileWarning className="h-4 w-4 shrink-0 text-red-500" />
                        ) : (
                          abortController && (
                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center rounded-md p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              disabled={progress === 100}
                              onClick={() => {
                                abortController.abort();
                              }}
                            >
                              <XIcon className="h-4 w-4 shrink-0 text-green-500" />
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div
                      className={clsx(
                        "absolute -bottom-1 h-1 w-full overflow-clip rounded-full",
                        typeof progress === "number" &&
                          "bg-gray-200 dark:bg-gray-700",
                      )}
                    >
                      <div
                        className="h-2 w-full bg-gray-400 transition-all duration-300 ease-in-out dark:bg-white"
                        style={{
                          width:
                            typeof progress === "number"
                              ? `${progress}%`
                              : "0%",
                        }}
                      />
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    );
  },
);
MultiFileDropzone.displayName = "MultiFileDropzone";

export { MultiFileDropzone };

function MultiFilesUpload(params: {
  onChange?: (
    value: { url?: string; filename?: string }[],
  ) => void | Promise<void>;
  files?: { url: string; filename: string }[];
}) {
  const inititalValues = params.files?.map((file) => ({
    key: Math.random().toString(36).slice(2),
    url: file.url,
    filename: file.filename,
    progress: "COMPLETE" as const,
  }));
  const [fileStates, setFileStates] = React.useState<FileState[]>(
    inititalValues || [],
  );

  const values = React.useMemo(
    () => fileStates.map(({ url, filename }) => ({ url, filename })),
    [fileStates],
  );

  React.useEffect(() => {
    void params.onChange?.(values);
  }, [values]);

  const { edgestore } = useEdgeStore();

  function updateFileProgress(
    key: string,
    progress: FileState["progress"],
    abortController?: AbortController,
  ) {
    setFileStates((fileStates) => {
      const index = fileStates.findIndex((fileState) => fileState.key === key);
      if (index === -1) return fileStates; // return the original array if no match is found

      const newFileStates = [
        ...fileStates.slice(0, index),
        {
          ...fileStates[index],
          progress,
          abortController,
        },
        ...fileStates.slice(index + 1),
      ];

      return newFileStates;
    });
  }

  return (
    <MultiFileDropzone
      fileState={fileStates}
      dropzoneOptions={{
        maxFiles: 2,
        maxSize: 1024 * 1024 * 1,
      }}
      className="p-2"
      onChange={setFileStates}
      onFilesAdded={async (addedFiles) => {
        setFileStates([
          ...fileStates,
          ...addedFiles.map((file) => ({
            ...file,
            filename: file.file?.name,
          })),
        ]);
        await Promise.all(
          addedFiles.map(async (addedFileState) => {
            const abortController = new AbortController();
            if (!addedFileState.file) return;
            try {
              const res = await edgestore.publicFiles.upload({
                file: addedFileState.file,
                onProgressChange: async (progress: number) => {
                  updateFileProgress(
                    addedFileState.key,
                    progress,
                    abortController,
                  );
                  if (progress === 100) {
                    // wait 1 second to set it to complete
                    // so that the user can see the progress bar
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    updateFileProgress(addedFileState.key, "COMPLETE");
                  }
                },
                signal: abortController.signal,
              });
              setFileStates((values) =>
                values.map((value) =>
                  value.key === addedFileState.key
                    ? { ...value, url: res.url }
                    : value,
                ),
              );
            } catch (err) {
              updateFileProgress(addedFileState.key, "ERROR");
            }
          }),
        );
      }}
    />
  );
}
export default React.memo(MultiFilesUpload);
