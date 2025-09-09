import { forwardRef, useImperativeHandle, type ReactNode } from "react";
import Modal from "./";
import { Controller, useForm } from "react-hook-form";
import InputField from "@/features/auth/components/InputField";
import DateField from "../DateField";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export interface NewTrainingDetailsModalHandle {
    /** Triggers the same logic as clicking "Cancel" inside the modal:
     * resets the form, closes the modal, and calls onClose().
     */
    cancel: () => void;
}

interface Props {
    open?: number | boolean;
    loading?: boolean;
    onClose?: () => void;
    setOpen?: (value: boolean) => void;
    children?: ReactNode;
    onConfirm?: (value: number | undefined | boolean | Record<string, any>) => void;
}

const NewTrainingDetailsModal = forwardRef<NewTrainingDetailsModalHandle, Props>(
    (
        {
            onConfirm,
            open = false,
            loading = false,
            children,
            setOpen = () => { },
            onClose = () => { },
        }: Props,
        ref
    ) => {
        const router = useNavigate();
        const {
            handleSubmit,
            reset,
            control,
            formState: { errors },
        } = useForm({
            defaultValues: { title: "", date: "" },
        });

        const modalTypeIsNew = open === true;

        const handleCancel = () => {
            reset();
            setOpen(false);
            onClose();
        };

        useImperativeHandle(ref, () => ({
            cancel: handleCancel,
        }));

        const onSubmit = (data: any) => {
            if (open === true) {
                router("/training/training-generator", {
                    state: {
                        trainingTitle: data?.title??"",
                        trainingDate: data.date?new Date(data.date).toISOString():null
                    },
                });
                handleCancel();
            } else {
                onConfirm?.(data);
            }
        };

        return (
            <div>
                <Modal isOpen={Boolean(open)} onClose={handleCancel}>
                    <div className="text-[#1D2530] dark:text-white">
                        <div className="text-xl font-medium pb-3">
                            {!modalTypeIsNew ? "Update" : "New"} Training Details
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 dark-form-field">
                            {/* Title */}
                            <div>
                                <Controller
                                    control={control}
                                    name="title"
                                    rules={{ required: "Please enter a topic name" }}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            placeholder="Enter Title"
                                            label="Title"
                                            error={errors["title"]}
                                        />
                                    )}
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <Controller
                                    control={control}
                                    name="date"
                                    render={({ field }) => (
                                        <DateField
                                            {...field}
                                            placeholder="Date"
                                            label="Date"
                                            error={errors["date"]}
                                        />
                                    )}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button onClick={handleCancel} variant="outline" className="border-[#2E313926]">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} loading={loading}>
                                    {!modalTypeIsNew ? "Update" : "Continue"}
                                </Button>
                            </div>
                        </form>

                        {children}
                    </div>
                </Modal>
            </div>
        );
    }
);

NewTrainingDetailsModal.displayName = "NewTrainingDetailsModal";
export default NewTrainingDetailsModal;
