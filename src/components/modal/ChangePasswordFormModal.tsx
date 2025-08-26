import React, { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import Modal from ".";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    changePasswordSchema,
    type ChangePasswordValues,
} from "../../features/auth/schemas/authSchema";
import { toast } from "react-toastify";
import { formErrorToast } from "../../util/formErrorToast";
import { useApi } from "../../features/auth/services/authService";
import AuthForm from "../../features/auth/components/AuthForm";
import Button from "../Button";

const fields = [
    { name: 'oldPassword', label: 'Old Password', type: 'password', placeholder: '*********' },
    { name: 'newPassword', label: 'Password', type: 'password', placeholder: '*********' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '*********' },
];

interface Props {
    open?: number | boolean;
    onClose?: () => void;
    setOpen?: (value: boolean) => void;
    children?: ReactNode;
    onConfirm?: () => void;
}

const ChangePasswordFormModal: React.FC<Props> = ({
    open,
    onClose,
    onConfirm,
    setOpen,
}) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    });
    const { request, loading } = useApi();



    const onSubmit = async (form: ChangePasswordValues) => {
        const { data, error } = await request({
            endpoint: "auth/update/",
            data: form,
            method: "POST",
        });

        if (data?.success) {
            toast.success(data?.message);
            onConfirm?.();
            reset();
        } else {
            // @ts-ignore
            const msg = error?.response?.data?.message;
            formErrorToast(msg, true);
        }
    };

    const onCancel = () => {
        setOpen?.(false);
        onConfirm?.();
        onClose?.();
        reset()
    };
    return (
        <Modal isOpen={Boolean(open)} onClose={() => { setOpen?.(false); onClose?.(); onCancel() }}>
            <div className="space-y-4 change-password-form">
                <div className="text-xl font-medium text-dark-default dark:text-white">
                    Change Password
                </div>

                <AuthForm
                    className='max-w-[500px] mx-auto pt-20'
                    fields={fields}
                    control={control}
                    errors={errors}
                    isSubmitting={loading}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button onClick={onCancel} variant="outline">Cancel</Button>
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Change Password
                        </Button>
                    </div>
                </AuthForm>
            </div>
        </Modal>
    );
};

export default ChangePasswordFormModal;

