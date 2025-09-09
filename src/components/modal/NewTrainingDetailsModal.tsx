<<<<<<< HEAD
import { forwardRef, useImperativeHandle, type ReactNode } from "react";
import Modal from "./";
import { Controller, useForm } from "react-hook-form";
import InputField from "@/features/auth/components/InputField";
=======
import Modal from "./";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../features/auth/components/InputField";
import type { ReactNode } from "react";
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
import DateField from "../DateField";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
export interface NewTrainingDetailsModalHandle {
    /** Triggers the same logic as clicking "Cancel" inside the modal:
     * resets the form, closes the modal, and calls onClose().
     */
    cancel: () => void;
}

interface Props {
    open?: number | boolean;
    loading?: boolean;
=======
interface Props {
    open?: number | boolean;
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    onClose?: () => void;
    setOpen?: (value: boolean) => void;
    children?: ReactNode;
    onConfirm?: (value: number | undefined | boolean | Record<string, any>) => void;
}

<<<<<<< HEAD
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
=======
const NewTrainingDetailsModal = ({
    onConfirm,
    open = false,
    children,
    setOpen = () => { },
    onClose = () => { },
}: Props) => {
    const router = useNavigate();
    const {
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { title: "", date: "" },
    });

    const onSubmit = (data: any) => {
        router("/training/training-generator", {
            state: {
                trainingTitle: data.title,
                trainingDate: new Date(data.date).toISOString()
            }
        });
        reset();
        setOpen(false);
    };

    const handleCancel = () => {
        reset();
        setOpen(false);
        onClose();
    };

    return (
        <div>
            <Modal isOpen={Boolean(open)} onClose={handleCancel}>
                <div className="text-[#1D2530] dark:text-white">
                    <div className="text-xl font-medium pb-3">New Training Details</div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 dark-form-field">
                        {/* Topic Name */}
                        <div>
                            <Controller
                                control={control}
                                name="title"
                                rules={{ required: "Please enter a topic name" }}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter topic name"
                                        label="Topic Name"
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
                                rules={{ required: "Please select a date" }}
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
                            <Button onClick={handleCancel} variant="outline">Cancel</Button>
                            <Button type="submit">Send Invitation</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
export default NewTrainingDetailsModal;
