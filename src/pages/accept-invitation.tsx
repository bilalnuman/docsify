import React from 'react'
import AuthForm from '../features/auth/components/AuthForm'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetSchema, type ResetFormValue } from '../features/auth/schemas/authSchema';
import { useApi } from '../features/auth/services/authService';
import { toast } from 'react-toastify';
import { formErrorToast } from '../util/formErrorToast';
const fields = [
    { name: 'password', label: 'Password', type: 'password', placeholder: '*********' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '*********' },
];

const AcceptInvitation = () => {
    const params = new URLSearchParams(window.location.search);
    const linkParam = params.get("link");
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: zodResolver(resetSchema),
    });
    const { request, loading } = useApi();

    const onSubmit = async (form: ResetFormValue) => {
        if (!linkParam) {
            toast.error("Invalid Link")
        }
        else {
            const { data, error } = await request({
                endpoint: `auth/password-reset-confirm/${linkParam}`,
                data: { ...form },
                method: "POST"
            });

            if (data?.success) {
                toast.success(data?.message)
                reset()
            } else {
                // @ts-ignore
                const msg = error?.response?.data?.message
                formErrorToast(msg, true)
            }
        }
    };

    return (
        <div>
            <AuthForm
                className='max-w-[500px] mx-auto rounded-xl mt-5'
                fields={fields}
                control={control}
                errors={errors}
                isSubmitting={loading}
                onSubmit={handleSubmit(onSubmit)}
                buttonText="Send"
                formHeader={
                    <div className='flex flex-col gap-y-2 pb-8'>
                        <div className='text-xl font-bold text-[#1D2530] dark:text-white'>Enter Password To Continue</div>
                        {/* <div className='dark:text-white'>Enter your new password to complete the reset process</div> */}
                    </div>}
            />
        </div>
    )
}

export default AcceptInvitation