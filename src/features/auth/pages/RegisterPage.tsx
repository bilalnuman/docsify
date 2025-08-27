import React from 'react';
import { registerSchema } from '../schemas/authSchema';
import { useAuthForm } from '../hooks/useAuthForm';
import AuthForm, { type fieldsType } from '../components/AuthForm';
import { toast } from 'react-toastify';
import { formErrorToast } from '../../../util/formErrorToast';
import AppLogo from "../../../assets/images/logo.png"
import FormSide from '../components/FormSide';
import DarkModeToggle from '../../../components/DarkModeToggle';
import AppDarkLogo from "../../../assets/images/dark-logo.png"
import { Link } from 'react-router-dom';
import { useRegistration } from '../../../hooks/useAuth';


const RegisterPage: React.FC = () => {
    const { mutateAsync: register, isPending } = useRegistration()
    const { handleSubmit, control, errors, onSubmit, reset } = useAuthForm(registerSchema, async (data:any) => {
        register(data, {
            onSuccess(data: any) {
                toast.success(data?.message, { toastId: "Registration-success" });
                reset()
            },
            onError(error) {
                // @ts-ignore
                const msg = error?.response?.data?.message
                formErrorToast(msg, true)
            },
        })
    });


    const fields: fieldsType[] = [
        { name: 'name', label: 'Name', type: 'text', placeholder: "Enter your name" },
        { name: 'email', label: 'Email', type: 'email', placeholder: "Enter your email" },
        { name: 'password', label: 'Password', type: 'password', placeholder: '*********' },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '*********' },
    ];



    return (
        <div className='min-h-screen'>
            <div className='max-w-[1440px] mx-auto'>
                <div className="grid sm:grid-cols-12 items-center">
                    <FormSide />
                    <div className='col-span-6 bg-white dark:bg-[#1A1B20] min-h-screen p-4'>
                        <div className='flex items-center justify-between'>
                            <img src={AppLogo} alt="logo" className=' w-[102px] dark:hidden' />
                            <img src={AppDarkLogo} alt="logo" className=' w-[102px] hidden dark:block' />
                            <DarkModeToggle />
                        </div>
                        <AuthForm
                            className='max-w-[500px] mx-auto sm:h-full h-[calc(100vh_-_7rem)] sm:block flex flex-col justify-center'
                            control={control}
                            fields={fields}
                            errors={errors}
                            isSubmitting={isPending}
                            onSubmit={handleSubmit(onSubmit)}
                            buttonText="Sign Up"
                            formHeader={
                                <div>
                                    <div className='text-3xl font-bold capitalize text-[#1D2530] dark:text-white'>Sign Up</div>
                                    <div className='text-[#1D253080] mb-7 dark:text-white'>Start your 7 days free trial</div>
                                </div>
                            }
                        >
                            <div className='text-center text-sm text-[#1D253080] dark:text-white mt-2'>
                                Already have an account? <Link to="/login" className="text-[#1556D4] underline font-bold">Sign In</Link>
                            </div>
                        </AuthForm>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
