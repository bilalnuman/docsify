import React from 'react';
import { useForm } from 'react-hook-form';
import { forgotSchema, type ForgotFormValue } from '../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthForm from '../components/AuthForm';
import AppLogo from "../../../assets/images/logo.png"
import AppDarkLogo from "../../../assets/images/dark-logo.png"
import Icon from '../../../components/Icon';
import { useApi } from '../services/authService';
import { formErrorToast } from '../../../util/formErrorToast';
import { toast } from 'react-toastify';
import DarkModeToggle from '../../../components/DarkModeToggle';
import LockSide from '../components/LockSide';

const ForgotPasswordPage: React.FC = () => {
  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(forgotSchema),
  });
  const { request, loading } = useApi();

  const onSubmit = async (form: ForgotFormValue) => {
    const { data, error } = await request({
      endpoint: 'auth/forgot-password/',
      data: form,
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
  };

  const fields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: "Enter your email" },
  ];

  return (
    <div className='min-h-screen'>
      <div className='max-w-[1440px] mx-auto'>
        <div className="grid sm:grid-cols-12 items-center">
          <LockSide />
          <div className='col-span-6 bg-white dark:bg-[#1A1B20] min-h-screen p-4'>
            <div className='flex items-center justify-between'>
              <img src={AppLogo} alt="logo" className=' w-[102px] dark:hidden' />
              <img src={AppDarkLogo} alt="logo" className=' w-[102px] hidden dark:block' />
              <DarkModeToggle />
            </div>
            <AuthForm
              className='max-w-[500px] mx-auto pt-20 sm:h-full h-[calc(100vh_-_9rem)] sm:block flex flex-col justify-center'
              fields={fields}
              control={control}
              errors={errors}
              isSubmitting={loading}
              onSubmit={handleSubmit(onSubmit)}
              buttonText="Submit"
              formHeader={
                <div className='flex flex-col gap-y-2 pb-8'>
                  <div className='w-[60px] h-[60px] rounded-full bg-[#1556D41A] flex justify-center items-center'><Icon name='lock' size='32' className='text-[#1556D4] dark:text-white' /></div>
                  <div className='text-3xl font-bold text-[#1D2530] dark:text-white'>Forgot Password?</div>
                  <div className='dark:text-white'>Enter your email to reset your password</div>
                </div>}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
