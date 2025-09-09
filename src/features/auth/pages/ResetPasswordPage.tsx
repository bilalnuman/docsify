import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthForm from '../components/AuthForm';
import { resetSchema, type ResetFormValue } from '../schemas/authSchema';
<<<<<<< HEAD
import Icon from '@/components/Icon';
import AppLogo from "@/assets/images/logo.svg"
import { toast } from 'react-toastify';
import { formErrorToast } from '@/util/formErrorToast';
import DarkModeToggle from '@/components/DarkModeToggle';
import LockSide from '../components/LockSide';
import AppDarkLogo from "@/assets/images/dark-logo.svg"
import { useResetPassword } from '@/hooks/useAuth';
=======
import Icon from '../../../components/Icon';
import AppLogo from "../../../assets/images/logo.png"
import { CiLock } from "react-icons/ci";
import { useApi } from '../services/authService';
import { toast } from 'react-toastify';
import { formErrorToast } from '../../../util/formErrorToast';
import DarkModeToggle from '../../../components/DarkModeToggle';
import LockSide from '../components/LockSide';
import AppDarkLogo from "../../../assets/images/dark-logo.png"
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

const ResetPasswordPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const linkParam = params.get("link");

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(resetSchema),
  });
<<<<<<< HEAD
  const { mutateAsync: resetPassword, isPending } = useResetPassword()
=======
  const { request, loading } = useApi();
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1

  const onSubmit = async (form: ResetFormValue) => {
    if (!linkParam) {
      toast.error("Invalid Link")
    }
    else {
<<<<<<< HEAD
      resetPassword({ password: form.newPassword, token: linkParam as string }, {
        onSuccess(data) {
          toast.success(data?.message)
          reset()
        },
        onError(error: any) {
          const msg = error?.response?.data?.message
          formErrorToast(msg, true)
        },
      })
=======
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
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    }
  };

  const fields = [
<<<<<<< HEAD
    { name: 'newPassword', label: 'Password', type: 'password', placeholder: '*********' },
=======
    { name: 'password', label: 'Password', type: 'password', placeholder: '*********' },
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '*********' },
  ];

  return (
    <div className='min-h-screen'>
      <div className='max-w-[1440px] mx-auto'>
        <div className="grid sm:grid-cols-12 items-center">
          <LockSide />
          <div className='col-span-6 bg-white dark:bg-[#1A1B20] min-h-screen p-4'>
            <div className='flex items-center justify-between'>
<<<<<<< HEAD
              <img src={AppLogo} alt="logo" className=' w-[102px] dark:hidden' />
              <img src={AppDarkLogo} alt="logo" className=' w-[102px] hidden dark:block' />
              <DarkModeToggle />
            </div>
            <AuthForm
              className='max-w-[500px] mx-auto min-h-[calc(100vh-4rem)] sm:block flex flex-col justify-center'
              fields={fields}
              control={control}
              errors={errors}
              isSubmitting={isPending}
              onSubmit={handleSubmit(onSubmit)}
              buttonText="Save New Password"
             
              formHeader={
                <div className='flex flex-col gap-y-2 pb-8'>
                  <div className='w-[60px] h-[60px] rounded-full bg-[#1556D41A] flex justify-center items-center'><Icon name='lock' size='32' className='text-[#1556D4] dark:text-white' /></div>
                  <div className='text-3xl font-semibold text-[#1D2530] dark:text-white'>Set New Password?</div>
=======
                <img src={AppLogo} alt="logo" className=' w-[102px] dark:hidden' />
                            <img src={AppDarkLogo} alt="logo" className=' w-[102px] hidden dark:block' />
              <DarkModeToggle />
            </div>
            <AuthForm
              className='max-w-[500px] mx-auto pt-20 sm:h-full h-[calc(100vh_-_12rem)] sm:block flex flex-col justify-center'
              fields={fields}
              control={control}
              errors={errors}
              isSubmitting={loading}
              onSubmit={handleSubmit(onSubmit)}
              buttonText="Save New Password"
              formHeader={
                <div className='flex flex-col gap-y-2 pb-8'>
                  <div className='w-[60px] h-[60px] rounded-full bg-[#1556D41A] flex justify-center items-center'><Icon name='lock' size='32' className='text-[#1556D4] dark:text-white' /></div>
                  <div className='text-3xl font-bold text-[#1D2530] dark:text-white'>Set New Password?</div>
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
                  <div className='dark:text-white'>Enter your new password to complete the reset process</div>
                </div>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
