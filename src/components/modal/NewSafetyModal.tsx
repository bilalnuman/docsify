
import Modal from "./";
import { Controller, useForm } from "react-hook-form";
import InputField from "../../features/auth/components/InputField";
import type { ReactNode } from "react";
import DateField from "../DateField";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { newSafetyModalFormSchema, type NewSafetyModalFormValues } from "../../features/auth/schemas/authSchema";
interface Props {
    open?: number | boolean;
    onClose?: () => void;
    setOpen?: (value: boolean) => void;
    children?: ReactNode;
    onConfirm?: (value: number | undefined | boolean) => void;
}

const NewSafetyModalForm = ({ onConfirm, open = false, children, setOpen = () => { }, onClose = () => { } }: Props) => {
    const router = useNavigate()
    const { handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(newSafetyModalFormSchema)
    });

    const onSubmit = (data: NewSafetyModalFormValues) => {
        router("/safety-meetings/topic-meeting-generator")
        handleCancel()
    }
    const handleCancel = () => {
        reset();
        setOpen(false);
        onClose();
    };
    return (
        <div>
            <Modal isOpen={Boolean(open)} onClose={() => { setOpen(false); onClose() }}>
                <div className="">
                    <div className="text-xl text-[#1D2530] font-medium pb-3 dark:text-white">
                        New Safety Topic Details
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="dark-form-field">
                        <div>
                            <Controller
                                control={control}
                                name="title"
                                render={({ field: controllerField }) => (
                                    <InputField
                                        {...controllerField}
                                        placeholder="Enter topic name"
                                        label="Topic Name"
                                        error={errors["title"]}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                control={control}
                                name="project_name"
                                render={({ field: controllerField }) => (
                                    <InputField
                                        {...controllerField}
                                        placeholder="Project Name"
                                        label="Project Name"
                                        error={errors["project_name"]}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                control={control}
                                name="address"
                                render={({ field: controllerField }) => (
                                    <InputField
                                        {...controllerField}
                                        placeholder="Job Site Address"
                                        label="Job Site Address"
                                        error={errors["address"]}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                control={control}
                                name="date"
                                render={({ field: controllerField }) => (
                                    <DateField
                                        {...controllerField}
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
                            <Button type="submit">Generate</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default NewSafetyModalForm;
