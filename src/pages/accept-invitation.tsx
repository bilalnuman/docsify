import React from 'react'
import AuthForm from '../features/auth/components/AuthForm'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetSchema, type ResetFormValue } from '../features/auth/schemas/authSchema';
import { toast } from 'react-toastify';
import { formErrorToast } from '../util/formErrorToast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearCookiesAndStorage } from '@/helpers/logoutUser';
import { useAcceptInvitation } from '@/hooks/useTeam';
import AppLogo from "@/assets/images/logo.svg";
import AppDarkLogo from "@/assets/images/dark-logo.svg";
import DarkModeToggle from "@/components/DarkModeToggle";
import PublicLayout from '@/components/PublicLayout';
const fields = [
    { name: 'newPassword', label: 'Password', type: 'password', placeholder: '*********' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '*********' },
];

const AcceptInvitation = () => {
    const { token: idParam } = useParams<{ token?: string }>();

    const token = idParam ? String(idParam) : NaN;
    const navigation = useNavigate();
    const { mutateAsync: resetPassword, isPending } = useAcceptInvitation()
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: zodResolver(resetSchema),
    });

    if (!idParam || Number.isNaN(token)) {
        toast.error("Invalid Link", {
            containerId: "link"
        })
    }

    const onSubmit = async (form: ResetFormValue) => {
        console.log(token)
        const payload = {
            password: form.newPassword,
            invitation_token: token
        }
        resetPassword(payload, {
            onSuccess: (res) => {
                toast.success(res?.message)
                reset()
                clearCookiesAndStorage()
                navigation("/login")
            },
            onError: (error: any) => {
                const msg = error?.response?.data?.message
                formErrorToast(msg, true)
            }
        })
    };

    return (
        <PublicLayout>
            <div className='h-[calc(100vh-5rem)] flex justify-center items-center flex-col'>
                <AuthForm
                    className='max-w-[500px] mx-auto rounded-xl mt-5 w-full !p-4'
                    fields={fields}
                    control={control}
                    errors={errors}
                    isSubmitting={isPending}
                    onSubmit={handleSubmit(onSubmit)}
                    buttonText="Send"
                    formHeader={
                        <div className='flex flex-col gap-y-2 pb-8'>
                            <div className='text-xl font-bold text-[#1D2530] dark:text-white'>Enter Password To Continue</div>
                        </div>}
                />
            </div>
        </PublicLayout >
    )
}

export default AcceptInvitation